
module.exports = {
  getParent(path) {
    return path.replace(/\/[\w-]+(\.\w+|\/)?$/, '');
  }
}
