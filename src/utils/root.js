const fs = require('fs');
const path = require('path');
const { success } = require("./log");

module.exports = {
  rootPath: '',
  getRoot(){
    return this.rootPath;
  },
  setRoot(rootName){
    this.rootPath = rootName;
  },
};
