'use strict';

var Promise = require('./promise');

//Promise.all方法实现
Promise.all = function (arr) {

  return new Promise(function (resolve, reject) {
    if (!(arr instanceof Array)) {
      reject(new TypeError(arr + 'is not iterable'));
    } else {
      var result = [];

      if (arr.length === 0) {
        resolve(result);
      } else {
        var canResolve = function canResolve() {
          return result.length === arr.length;
        };

        var onFulfilled = function onFulfilled(i) {
          return function (v) {
            result[i] = v;
            if (canResolve()) {
              resolve(v);
            }
          };
        };

        var onRejected = function onRejected(r) {
          reject(r);
        };
        Array.prototype.forEach.call(arr, function (v, i) {
          Promise.resolve(v).then(onFulfilled(i), onRejected);
        });
      }
    }
  });
};