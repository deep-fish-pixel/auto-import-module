/**
 * 根据条件决定是否执行
 * @param conditon
 * @param callback
 * @param otherResult
 */
module.exports = function (conditon, callback, otherResult){
  if (conditon === true || conditon && conditon.length > 0) {
    return typeof callback === 'function' ? callback() : callback;
  } else {
    return otherResult;
  }
}