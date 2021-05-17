module.exports = {
  options: {
    dir: '',
    extension: '',
    importModuleOnly: false,
  },
  getModuleOptions(){
    return this.options;
  },
  setModuleOptions(rootName){
    this.options = rootName;
  },
};
