const fs = require('fs');
const path = require('path');
const { getParent } = require("./file");
const { success } = require("./log");
const { getRoot } = require('./root');
const directory = require("./directory");
const batchExecute = require("./batchExecute");


/**
 * 添加默认入口文件index
 * @param dir
 */
function addImport(fileName) {
  const parentDir = getParent(fileName);
  const rootDir = getRoot();
  if (fileName !== rootDir) {
    const parentDirIndex = path.join(parentDir, 'index.js');
    batchExecute(parentDirIndex, () => {
      writeImportFile(parentDirIndex, directory.getChildren(parentDir, {
        exclude: [ 'index.js' ],
      }));
    });
  }
}

function writeImportFile(parentDirIndex, files){
  let importModule = '', ouputModule = files.length ? '\n' : '';
  files.forEach((file) => {
    const parentName = file.replace(/[\s\S]*\/|\.\w+/g, '');
    importModule += `import ${parentName} from './${parentName}';\n`;
    ouputModule += `  ${parentName},\n`;
  });
  const data = new Uint8Array(Buffer.from(`${importModule}
export default {${ouputModule}};
`));
  fs.writeFile(parentDirIndex, data, (err) => {
    if (err) throw err;
    success(`自动导入并组装模块 ${parentDirIndex.replace(process.cwd(), '')}`);
  });
}

module.exports =  addImport;
