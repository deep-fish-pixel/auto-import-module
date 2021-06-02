const { getModuleOptions } = require('./moduleOptions');

module.exports = function (file, camelModuleName, fileName) {
  const { exportModuleTypes, exportModuleTypeDefault } = getModuleOptions();
  let exportModuleType = exportModuleTypeDefault;
  const matchRegExps = Object.keys(exportModuleTypes);
  matchRegExps.some(matchRegExp => {
    if(file.match(new RegExp(matchRegExp))) {
      exportModuleType = exportModuleTypes[matchRegExp];
      return true;
    }
  })
  return exportModuleType.replace(/\{module}/g, camelModuleName).replace(/\{filename}/g, fileName);
}
