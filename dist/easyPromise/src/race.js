'use strict';

var Promise = require('./promise');

//race方法
Promise.race = function (arr) {

  return new Promise(function (resolve, reject) {
    if (!(arr instanceof Array)) {
      reject(new TypeError(arr + 'is not iterable'));
    } else {
      Array.prototype.forEach.call(arr, function (v) {
        resolve(Promise.resolve(v));
      });
    }
  });
};