function success(message){
  console.log('\x1B[32m%s\x1B[0m', `✔${message}`);
}

function warn(message){
  console.log('\x1B[33m%s\x1B[0m', `＊${message}`);
}

function error(message){
  console.log('\x1B[31m%s\x1B[0m', `✘${message}`);
}

module.exports = {
  success,
  warn,
  error
};
