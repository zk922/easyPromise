'use strict';

var Promise = require('./promise');

//实现catch方法

/** in fact, calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected) **/

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};