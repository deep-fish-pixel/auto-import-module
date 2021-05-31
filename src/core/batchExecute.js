const cache = new Map();
/**
 * 批量延期执行，解决读写等场景的并发冲突
 * @param key
 * @param callback
 * @param delayTime
 */
module.exports = function (key, delayTime = 30) {
  const { timer, reject, resolved, timestamp } = cache.get(key) || {};
  if(timer) {
    if (resolved) {
      // 防抖
      if (Date.now() - timestamp < 200) {
        return Promise.reject();
      }
    } else {
      // 清除上一次延迟记录
      clearTimeout(timer);
      reject(new Error('clear execute!!!'));
    }
  }

  return new Promise((resolve, reject) => {
    const cacheObj = {
      timer: setTimeout(() => {
        cacheObj.resolved = true;
        resolve();
      }, delayTime),
      reject,
      timestamp: Date.now()
    };
    cache.set(key, cacheObj);
  });
};
