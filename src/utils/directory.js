const { getParent } = require("./file");
const executeByCondition = require('./executeByCondition');

const directories = new Map();


module.exports = {
  add(path) {
    const parentDir = getParent(path);
    const children = this.getChildren(parentDir);
    children.push(path);
    directories.set(parentDir, children.sort());
  },
  remove(path) {
    const parentDir = getParent(path);
    const children = this.getChildren(parentDir);
    // 移除父目录里的该文件
    directories.set(parentDir, children.filter(child => child !== path));
    // 移除该目录的内容
    directories.delete(path);
  },
  getChildren(parentDir, { exclude } = {}){
    const children = directories.get(parentDir) || [];
    return executeByCondition(exclude, () => {
      return children.filter(file => !exclude.some(flag => file.indexOf(flag) >= 0))
    }, children);
  }
}