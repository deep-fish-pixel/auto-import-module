const cache = new Map();
/**
 * 批量延期执行，解决读写等场景的并发冲突
 * @param key
 * @param callback
 * @param delayTime
 */
module.exports = function (key, callback, delayTime = 10) {
  const timer = cache.get(key);
  if(timer) {
    clearTimeout(timer);
  }
  cache.set(key, setTimeout(callback, delayTime));
};