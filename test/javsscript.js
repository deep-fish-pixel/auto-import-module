/**
 * 测试开始
 */
const path = require('path');
const autoImportModule = require('../src/index')
const exportModuleTypes = require('../src/core/constants/exportModuleTypes');

setTimeout(() => {
  autoImportModule({
    root: path.join(process.cwd(), 'temp'),
    extension: '.js',
    exportModuleTypes: {
      '/en-US$': exportModuleTypes.FILE_NAME_MODULE,
      '/zh-CN$': exportModuleTypes.FILE_NAME_MODULE,
    },
  });
}, 3000)
