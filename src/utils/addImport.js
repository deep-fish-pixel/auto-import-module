const fs = require('fs');
const path = require('path');
const { getParent } = require("./file");
const { success } = require("./log");
const { getModuleOptions } = require('./moduleOptions');
const directory = require("./directory");
const batchExecute = require("./batchExecute");


/**
 * 添加引入并导出模块
 * @param fileName
 */
function addImport(fileName) {
  const parentDir = getParent(fileName);
  const { dir } = getModuleOptions();
  if (fileName !== dir) {
    const { extension } = getModuleOptions();
    const indexFileName = `index${extension}`;
    const parentDirIndex = path.join(parentDir, indexFileName);
    batchExecute(parentDirIndex).then(() => {
      writeImportFile(parentDirIndex, directory.getChildren(parentDir, {
        exclude: [ indexFileName ],
      }));
    });
  }
}

/**
 * 输出模块
 * @param parentDirIndex
 * @param files
 */
function writeImportFile(parentDirIndex, files){
  let importModule = '', ouputModule = files.length ? '\n' : '';
  files.forEach((file) => {
    const parentName = file.replace(/[\s\S]*\/|\.\w+/g, '');
    importModule += `import ${parentName} from './${parentName}';\n`;
    ouputModule += `  ${parentName},\n`;
  });
  if (importModule) {
    importModule += '\n';
  }
  const data = new Uint8Array(Buffer.from(`${importModule}export default {${ouputModule}};
`));
  fs.writeFile(parentDirIndex, data, (err) => {
    if (err) throw err;
    success(`自动导入并组装模块 ${parentDirIndex.replace(process.cwd(), '')}`);
  });
}

module.exports =  addImport;
