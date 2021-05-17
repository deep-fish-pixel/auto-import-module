/**
 * 监控文件夹
 */
const path = require('path')
const chokidar = require('chokidar');
const addIndex = require('./utils/addIndex');
const addImport = require('./utils/addImport');
const { setModuleOptions } = require('./utils/moduleOptions');
const directory = require("./utils/directory");

module.exports = function (options = {}) {
  options = Object.assign({
    dir: path.join(process.cwd(), 'temp'),
    extension: '.js',
    importModuleOnly: false,
  }, options);
  setModuleOptions(options);
  const watcher = chokidar.watch(options.dir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher
    .on('add', path => {
      directory.add(path);
      addImport(path);
    })
    .on('unlink', path => {
      directory.remove(path);
      addImport(path);
    })
    .on('addDir', path => {
      addIndex(path);
      directory.add(path);
      addImport(path);
    })
    .on('unlinkDir', path => {
      directory.remove(path);
      addImport(path);
    });
}
