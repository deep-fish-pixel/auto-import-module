const _options = {
  root: '',
  extension: '',
  importModuleOnly: false,
};

function getModuleOptions(){
  return _options;
}

function setModuleOptions(options) {
  Object.assign(_options, options);
}

function getRelativeDir(dir) {
  const { root } = getModuleOptions();
  return dir.replace(root, '');
}

module.exports = {
  getModuleOptions,
  setModuleOptions,
  getRelativeDir
};
