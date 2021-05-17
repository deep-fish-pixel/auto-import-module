const fs = require('fs');
const path = require('path');
const { getParent } = require("./file");
const { success } = require("./log");
const { getModuleOptions } = require('./moduleOptions');
const directory = require("./directory");
const batchExecute = require("./batchExecute");
const executeByCondition = require('./executeByCondition');

const importFlags = {
  '.js': 'import',
  '.ts': 'import',
  '.scss': '@import',
  '.less': '@import',
  '.styl': '@import',
}

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
    }).catch(() => {});
  }
}

/**
 * 输出模块
 * @param parentDirIndex
 * @param files
 */
function writeImportFile(parentDirIndex, files){
  const { importModuleOnly, extension } = getModuleOptions();
  let importModule = '', ouputModule = files.length ? '\n' : '';
  const extensionExpReg = new RegExp(`(${extension.replace('.', '\\.')}|\/\\w+)$`)
  files.forEach((file) => {
    // 引入文件后缀与配置的扩展后缀相同
    if (file.match(extensionExpReg)) {
      const parentName = file.replace(/[\s\S]*\/|\.\w+/g, '');
      if (importModuleOnly) {
        importModule += `${importFlags[extension]} './${parentName}';\n`;
      } else {
        importModule += `import ${parentName} from './${parentName}';\n`;
        ouputModule += `  ${parentName},\n`;
      }
    }
  });
  if (importModule) {
    importModule += '\n';
  }
  const data = new Uint8Array(Buffer.from(`${importModule}` + executeByCondition(importModuleOnly, '', `export default {${ouputModule}};`) + `\n`));
  fs.writeFile(parentDirIndex, data, (err) => {
    if (err) throw err;
    success(`自动导入并组装模块 ${parentDirIndex.replace(process.cwd(), '')}`);
  });
}

module.exports =  addImport;
