const fs = require('fs');

/**
 * 读取文件
 * @param file
 * @returns {Promise<unknown>}
 */
module.exports = function (file) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(file)){
      fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}
