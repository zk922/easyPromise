'use strict';

var STATUS = require('./status');

/**
 * 更改Promise状态，并通知下一个promise的方法
 * 通过call方法调用，改变this指向promise
 * **/
function resolve(value) {
  var _this = this;

  if (this.status !== STATUS[0]) return;
  this.status = STATUS[1];
  this.value = value;

  if (this.nextPromises.length > 0) {
    this.nextPromises.forEach(function (v) {
      v.onFulfilled[0] instanceof Function && v.onFulfilled[0](_this.value);
    });
  }
}
function reject(reason) {
  var _this2 = this;

  if (this.status !== STATUS[0]) return;
  this.status = STATUS[2];
  this.reason = reason;

  if (this.nextPromises.length > 0) {
    this.nextPromises.forEach(function (v) {
      v.onRejected[0] instanceof Function && v.onRejected[0](_this2.reason);
    });
  }
}
/**
 * 封装onfulfill和onreject的方法,注册为then生成的promise2的onfulfill和onreject回调
 * @Params onFulfill  then方法调用时候传入的onFulfill回调，onreject同理
 * @Params promise2   then方法生成并返回的promise
 * **/

/**
 * 下面根据规范进行onFulfill和onReject的判断
 * 1.如果 onFulfilled 或者 onRejected 返回一个值 ，根据值进行  下面处理x的流程处理。
 * 2.如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
 * 3.如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
 * 4.如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
 * **/
function onFulfillRegister(onFulfill, promise2) {
  return function (value) {
    /** @Param value 上一个promise成功执行后，传递给下个promise2的value**/
    setTimeout(function () {
      if (!(onFulfill instanceof Function)) {
        resolve.call(promise2, value);
        return;
      }
      var result = void 0;

      try {
        result = onFulfill.call(undefined, value);
      } catch (e) {
        reject.call(promise2, e);
        return;
      }
      _resolveX(result, promise2);
    }, 0);
  };
}
function onRejectRegister(onReject, promise2) {
  return function (reason) {
    /** @Param reason 上一个promise成功失败后，传递给下个promise2的reason**/
    setTimeout(function () {
      if (!(onReject instanceof Function)) {
        reject.call(promise2, reason);
        return;
      }
      var result = void 0;

      try {
        result = onReject.call(undefined, reason);
      } catch (e) {
        reject.call(promise2, e);
        return;
      }
      _resolveX(result, promise2);
    }, 0);
  };
}

/**
 * 处理x返回值的流程
 * @params result  用户输入的onfulfill或者onreject的返回值x
 * @params promise2
 * **/
function _resolveX(result, promise2) {
  /** 1.If promise and x refer to the same object, reject promise with a TypeError as the reason. **/
  if (result === promise2) {
    reject.call(promise2, new TypeError('Chaining cycle detected for promise'));
    return;
  }
  /** 2.If x is a promise, adopt its state **/
  if (result instanceof Promise) {
    switch (result.status) {
      case STATUS[0]:
        /** 2.1 If x is pending, promise must remain pending until x is fulfilled or rejected. **/
        result.then(resolve.bind(promise2), reject.bind(promise2));
        break;
      case STATUS[1]:
        /** 2.2 If/when x is fulfilled, fulfill promise with the same value. **/
        resolve.call(promise2, result.value);
        break;
      case STATUS[2]:
        /** 2.3 If/when x is rejected, reject promise with the same reason. **/
        reject.call(promise2, result.reason);
        break;
    }
    return;
  }
  /** 3.Otherwise, if x is an object or function, **/
  if (result !== null && result !== undefined && Object.getPrototypeOf(result) === null || result instanceof Object || result instanceof Function) {
    var then = void 0;
    try {
      /** 3.1 Let then be x.then **/
      then = result.then;
    } catch (e) {
      /** 3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason. **/
      reject.call(promise2, e);
      return;
    }
    if (typeof then === 'function') {
      //这里需要注意，Object.create(Function.prototype)生成的对象，
      //obj instanceof Function会判断为true，但是实际并不是可执行函数
      //而typeof obj 返回值是object可以区分开，所以用typeof判断
      /** 3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, **/
      var triggered = false;
      try {
        then.call(result, function resolvePromise(y) {
          if (triggered) return;
          _resolveX(y, promise2);
          triggered = true;
        }, function rejectPromise(r) {
          if (triggered) return;
          reject.call(promise2, r);
          triggered = true;
        });
      } catch (e) {
        !triggered && reject.call(promise2, e);
      }
    } else {
      /** 3.4 If then is not a function, fulfill promise with x. **/
      resolve.call(promise2, result);
    }
    return;
  }
  /** 4. If x is not an object or function, fulfill promise with x. **/
  resolve.call(promise2, result);
}

/**
 * Promise类的主函数
 * 这里并没有将属性设置为私有变量，也没有用属性定义方法更改属性可修改性
 * 实际使用中，用户不应该可以去更改这些属性，但是对于
 * **/
function Promise(fn) {
  var _this3 = this;

  this.status = STATUS[0];
  this.value = undefined;
  this.reason = undefined;

  this.nextPromises = [];
  this.onFulfilled = [];
  this.onRejected = [];

  //如果没有输入
  try {
    //第一个启动的promise中，用户resolve的值是需要进行结果处理的，比如，如果用户resolve了一个Promise，第一个promise是要进行resolve流程的
    fn(function (v) {
      return _resolveX(v, _this3);
    }, reject.bind(this));
  } catch (e) {
    reject.call(this, e);
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  var promise2 = new Promise(function () {});
  //用户输入的两个回调函数只是处理数据，promise的实现中，需要在数据处理后，进行promise状态改变并通知下一个
  //promise.所以，实际注册的promise需要进行封装
  promise2.onFulfilled.push(onFulfillRegister(onFulfilled, promise2));
  promise2.onRejected.push(onRejectRegister(onRejected, promise2));
  /**
   * @link http://www.ituring.com.cn/article/66566
   * **/
  this.nextPromises.push(promise2);
  //如果上一个promise已经结束，then生成的promise需要直接去触发注册好的回调
  if (this.status === STATUS[1]) {
    promise2.onFulfilled[0](this.value);
  } else if (this.status === STATUS[2]) {
    promise2.onRejected[0](this.reason);
  }
  return promise2;
};
module.exports = Promise;

/** 附加实现的一些方法，需要放在module.exports后面，具体原因需要去理解nodeJs 模块加载的实现方法，看源码去吧。。 **/

//实现Promise.resolve()和Promise.reject()
require('./returnPromise');
//实现catch方法
require('./catch');
//实现finally方法
require('./finally');
//实现Promise.race方法
require('./race');
//实现Promise.all方法
require('./all');