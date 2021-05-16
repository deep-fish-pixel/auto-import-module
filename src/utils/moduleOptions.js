module.exports = {
  options: {
    dir: '',
    extension: '',
  },
  getModuleOptions(){
    return this.options;
  },
  setModuleOptions(rootName){
    this.options = rootName;
  },
};
