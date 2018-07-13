const status = require('status');

const {
  isThenAble,
  changeAble
} = require('tool');

let Promise = (function(){

  const STATUS = status;


  /**
   * 更改Promise状态，并通知下一个promise的方法
   * **/
  function resolve(value){
    this.status = STATUS[1];
    this.value = value;

    if(this.nextPromise instanceof Promise && this.nextPromise.onFulfilled[0] instanceof Function){
      this.nextPromise.onFulfilled[0](this.value);
    }
  }
  function reject(reason){
    this.status = STATUS[2];
    this.reason = reason;

    if(this.nextPromise instanceof Promise && this.nextPromise.onRejected[0] instanceof Function){
      this.nextPromise.onRejected[0](this.reason);
    }
  }
  /**
   * 封装onfulfill和onreject的方法,注册为then生成的promise2的onfulfill和onreject回调
   * @Params onFulfill  then方法调用时候传入的onFulfill回调，onreject同理
   * @Params promise2   then方法生成并返回的promise
   * **/

  /**
   * 下面根据规范进行onFulfill和onReject的判断
   * 1.如果 onFulfilled 或者 onRejected 返回一个值 ，promise2变为onfulfilled。
   * 2.如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
   * 3.如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
   * 4.如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
   * **/
  function onFulfillRegister(onFulfill, promise2){
    return function (value) {
      /** @Param value 上一个promise成功执行后，传递给下个promise2的value**/
      //TODO promise 解决过程
      if(!(onFulfill instanceof Function)){
        resolve.call(promise2, value);
        return;
      }
      let result;
      try {
        result = onFulfill.call(undefined, value);
      }
      catch (e) {
        reject.call(promise2, e);
      }
      resolve.call(promise2, result);
    }
  }
  function onRejectRegister(onReject, promise2){
    return function (reason) {
      /** @Param reason 上一个promise成功失败后，传递给下个promise2的reason**/
      if(!(onReject instanceof Function)){
        reject.call(promise2, reason);
        return;
      }
      let result;
      try {
        result = onReject.call(undefined, reason);
      }
      catch (e) {
        reject.call(promise2, e);
      }
      resolve.call(promise2, result);
    }
  }



  /**
   * Promise类的主函数
   * **/
  function Promise(fn) {
    this.status = STATUS[0];
    this.value = undefined;
    this.reason = undefined;

    this.nextPromise = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    try {
      fn(resolve.bind(this), reject.bind(this));
    }
    catch (e) {
      reject.call(this, e);
    }

  }
  Promise.prototype.then = function(onFulfilled, onRejected){
    let promise2 = new Promise();
    // onFulfilled instanceof Function && promise2.onFulfilled.push(onFulfilled.bind(undefined));
    // onRejected instanceof Function && promise2.onRejected .push(onRejected.bind(undefined));

    //TODO 需要封装下fulfill 和reject函数
    //TODO 根据fullfill和reject返回值更改promise2状态，并通知nextPromise，这里需要详细看文档跟着文档走
    /**
     * @link http://www.ituring.com.cn/article/66566
     * **/

    this.nextPromise = promise2;



    //TODO 如果前一个promise已经执行完成，注册then时候，不进行判断的话，后面的pormise是不会调用的。所以注册时候需要判断下。
    //TODO 有人说用setTimeout,但是后面动态调用then的话也不会执行。所以最好是在注册时候就进行一次判断。
    if(this.status === STATUS[1]){

    }
    else if(this.status === STATUS[2]){

    }

    return promise2;
  };

  return Promise;
})();

module.exports = Promise;