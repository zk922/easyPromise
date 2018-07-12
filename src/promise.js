const status = require('status');

const { isThenAble } = require('tool');

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