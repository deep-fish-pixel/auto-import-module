const cache = new Map();
/**
 * 批量延期执行，解决读写等场景的并发冲突
 * @param key
 * @param callback
 * @param delayTime
 */
module.exports = function (key, delayTime = 10) {
  const { timer, reject, } = cache.get(key) || {};
  if(timer) {
    // 清除上一次延迟记录
    clearTimeout(timer);
    reject();
  }

  return new Promise((resolve, reject) => {
    cache.set(key, {
      timer: setTimeout(() => {
        resolve();
        cache.delete(key);
      }, delayTime),
      reject
    });
  }).catch(() => {});
};