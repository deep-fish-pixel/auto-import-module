/**
 * conf.json中打包日期自动替换
 */
const path = require('path')
const chokidar = require('chokidar');
const addIndex = require('./utils/addIndex');

const watcher = chokidar.watch(path.join(process.cwd(), 'dist'), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path.replace(process.cwd(), '')} has been added`))
  .on('unlink', path => console.log(`File ${path.replace(process.cwd(), '')} has been removed`))
  .on('addDir', path => {
    console.log(`Directory ${path.replace(process.cwd(), '')} has been added`)
    addIndex(path);

  })
  .on('unlinkDir', path => console.log(`Directory ${path.replace(process.cwd(), '')} has been removed`));

