/**
 * 测试开始
 */
const path = require('path');
const autoImportModule = require('../src/index')

setTimeout(() => {
  autoImportModule({
    root: path.join(process.cwd(), 'temp'),
    extension: '.js',
  });
}, 3000)
