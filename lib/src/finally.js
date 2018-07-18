'use strict';

var Promise = require('./promise');
//实现finally方法
Promise.prototype.finally = function (fn) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _this.then(function (v) {
      resolve(v);
      fn(v);
    }, function (r) {
      reject(r);
      fn(r);
    });
  });
};