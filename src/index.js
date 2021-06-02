/**
 * 监控文件夹
 */
const chokidar = require('chokidar');
const {
  addFileImport,
  addDirImport,
  removeFileImport,
  removeDirImport
} = require('./core/addImport');
const { setModuleOptions } = require('./core/moduleOptions');
const exportModuleTypes = require('./core/constants/exportModuleTypes');


module.exports = function (options = {}) {
  options = Object.assign({
    root: '',
    extension: '.js',
    exportModuleTypeDefault: exportModuleTypes.SPREAD_MODULE,
    exportModuleTypes: {
    },
  }, options);

  setModuleOptions(options);

  const watcher = chokidar.watch(options.root, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  });

  watcher
    .on('add', file => {
      addFileImport(file);
    })
    .on('unlink', file => {
      removeFileImport(file);
    })
    .on('addDir', dir => {
      addDirImport(dir);
    })
    .on('unlinkDir', dir => {
      removeDirImport(dir);
    });
}

Object.assign(module.exports, {
  setAutoImportOptions: setModuleOptions,
  addFileImport,
  addDirImport,
  removeFileImport,
  removeDirImport,
  exportModuleTypes
})
