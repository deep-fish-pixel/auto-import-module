/**
 * 监控文件夹
 */
const path = require('path')
const chokidar = require('chokidar');
const addIndex = require('./utils/addIndex');
const addImport = require('./utils/addImport');
const { setRoot } = require('./utils/root');
const directory = require("./utils/directory");


const root = path.join(process.cwd(), 'temp');
setRoot(root);
const watcher = chokidar.watch(root, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', path => {
    console.log(`File ${path.replace(process.cwd(), '')} has been added`)
    directory.add(path);
    addImport(path);
  })
  .on('unlink', path => {
    console.log(`File ${path.replace(process.cwd(), '')} has been removed`)
    directory.remove(path);
  })
  .on('addDir', path => {
    console.log(`Directory ${path.replace(process.cwd(), '')} has been added`)
    addIndex(path);
    directory.add(path);
    addImport(path);
  })
  .on('unlinkDir', path => {
    console.log(`Directory ${path.replace(process.cwd(), '')} has been removed`)
    directory.remove(path);
  });

