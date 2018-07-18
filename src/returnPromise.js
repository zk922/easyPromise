const Promise = require('./promise');
//实现Promise.resolve()和Promise.reject()
Promise.resolve = function (v) {
  return new Promise(function (resolve) {
    resolve(v);
  })
};
Promise.reject = function (r) {
  return new Promise(function (resolve,reject) {
    reject(r);
  })
};