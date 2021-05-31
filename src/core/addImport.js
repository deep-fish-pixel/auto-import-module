const fs = require('fs');
const path = require('path');
const cacheDirFind = require('cache-dir-find');
const { getParent } = require('./file');
const { getModuleOptions } = require('./moduleOptions');
const batchExecute = require('./batchExecute');
const executeByCondition = require('./executeByCondition');
const readFile = require('./readFile');
const { success, warn, error} = require('./log');

const importFlags = {
  '.js': 'import',
  '.ts': 'import',
  '.scss': '@import',
  '.less': '@import',
  '.styl': '@import',
}

const importSuffixes = {
  '.js': false,
  '.ts': false,
  '.scss': false,
  '.less': false,
  '.styl': false,
}

/**
 * 添加文件引入并导出模块
 * @param fileName
 */
function importFile(fileName, isRemove) {
  const parentDir = getParent(fileName);
  const { root } = getModuleOptions();
  if (fileName !== root) {
    const { extension } = getModuleOptions();
    const indexFileName = `index${extension}`;
    const parentDirIndex = path.join(parentDir, indexFileName);
    batchExecute(parentDirIndex).then(() => {
      // 防止父目录删除导致写入多余
      if (cacheDirFind.getParent(parentDirIndex)) {
        writeImportFile(parentDirIndex, cacheDirFind.getChildren(parentDir, {
          exclude: [ indexFileName ],
        }), isRemove, fileName.replace(root.replace(/[\w-]+$/, ''), ''));
      }
    }).catch(() => {});
  }
}

/**
 * 添加文件引入并导出模块
 * @param fileName
 */
function addFileImport(fileName) {
  cacheDirFind.add(fileName);
  importFile(fileName, false);
}


/**
 * 添加目录引入并导出模块
 * @param dir
 */
function addDirImport(dir) {
  cacheDirFind.add(dir);
  const { extension } = getModuleOptions();
  importFile(path.join(dir, `index${extension}`));
  importFile(dir, false);
}

/**
 * 移除文件入并删除模块
 * @param dir
 */
function removeFileImport(dir) {
  cacheDirFind.remove(dir);
  importFile(dir, true);
}

/**
 * 移除目录引入并删除模块
 * @param dir
 */
function removeDirImport(dir) {
  cacheDirFind.remove(dir);
  importFile(dir, true);
}

function replaceExportModule(oldExportModule, exportModulePrev, exportModuleTail){
  const exportModulesRegExp = /^[^:]*(,?\s*\n)(\s*['"]?[^:\s]+['"]?:)/;
  if (oldExportModule && oldExportModule.match(exportModulesRegExp)) {
    return oldExportModule.replace(exportModulesRegExp, (all, startStr, endStr) => `${exportModulePrev.match(/\n$/) ? exportModulePrev : exportModulePrev + '\n' }${endStr}`);
  }
  return `${exportModulePrev}${exportModuleTail}`;
}

/**
 * 输出模块
 * @param parentDirIndex
 * @param files
 */
function writeImportFile(parentDirIndex, files, isRemove, removeFile){
  const { importModuleOnly, extension } = getModuleOptions();
  let importModule = '', ouputModule = files.length ? '\n' : '';
  const extensionExpReg = new RegExp(`(${extension.replace('.', '\\.')}|\/\\w+)$`)
  files.forEach((file) => {
    // 引入文件后缀与配置的扩展后缀相同
    if (file.match(extensionExpReg)) {
      const parentName = file.replace(/[\s\S]*\/|\.\w+/g, '');
      if (importModuleOnly) {
        importModule += `${importFlags[extension]} './${parentName}${importSuffixes[extension] ? extension : ''}';\n`;
      } else {
        importModule += `import ${parentName} from './${parentName}${importSuffixes[extension] ? extension : ''}';\n`;
        ouputModule += `  ...${parentName},\n`;
      }
    }
  });
  if (importModule) {
    importModule += '\n';
  }
  readFile(parentDirIndex).then((data) => {
    const output = `${importModule}`
      + executeByCondition(importModuleOnly,
        '',
        replaceExportModule(data, `export default {${ouputModule}`, '};'))
      + '\n';
    const outputBuffer = new Uint8Array(Buffer.from(output));
    fs.writeFile(parentDirIndex, outputBuffer, (err) => {
      if (err) {
        return error(`[自动导入] ${err.message}`);
      }
      (isRemove ? warn : success )(`[自动导入] ${isRemove ? '删除模块' : '组装模块'}成功: ${removeFile}`);
    });
  });
}

module.exports =  {
  addFileImport,
  removeFileImport,
  addDirImport,
  removeDirImport,
};
