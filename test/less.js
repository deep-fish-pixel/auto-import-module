/**
 * 测试开始
 */
const path = require('path');
const autoImportModule = require('../src/index')

autoImportModule({
  root: path.join(process.cwd(), 'temp'),
  extension: '.less',
  importModuleOnly: true,
});
