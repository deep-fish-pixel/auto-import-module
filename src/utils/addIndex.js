const fs = require('fs');
const path = require('path');
const { success } = require("./log");

/**
 * 添加默认入口文件index
 * @param dir
 */
function addIndex(dir) {
  const file =path.join(dir, 'index.js');
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      writeFile(file);
    }
  });
}

function writeFile(file){
  const data = new Uint8Array(Buffer.from(`export default {};`));
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    success(`自动生成${file.replace(process.cwd(), '')}`);
  });
}

module.exports =  addIndex;
