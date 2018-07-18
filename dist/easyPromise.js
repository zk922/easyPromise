/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/forBrowser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/all.js":
/*!********************!*\
  !*** ./src/all.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\n\n//Promise.all方法实现\nPromise.all = function (arr) {\n\n  return new Promise(function (resolve, reject) {\n    if (!(arr instanceof Array)) {\n      reject(new TypeError(arr + 'is not iterable'));\n    } else {\n      var result = [];\n\n      if (arr.length === 0) {\n        resolve(result);\n      } else {\n        var canResolve = function canResolve() {\n          return result.length === arr.length;\n        };\n\n        var onFulfilled = function onFulfilled(i) {\n          return function (v) {\n            result[i] = v;\n            if (canResolve()) {\n              resolve(v);\n            }\n          };\n        };\n\n        var onRejected = function onRejected(r) {\n          reject(r);\n        };\n        Array.prototype.forEach.call(arr, function (v, i) {\n          Promise.resolve(v).then(onFulfilled(i), onRejected);\n        });\n      }\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/all.js?");

/***/ }),

/***/ "./src/catch.js":
/*!**********************!*\
  !*** ./src/catch.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\n\n//实现catch方法\n\n/** in fact, calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected) **/\n\nPromise.prototype.catch = function (onRejected) {\n  return this.then(undefined, onRejected);\n};\n\n//# sourceURL=webpack:///./src/catch.js?");

/***/ }),

/***/ "./src/finally.js":
/*!************************!*\
  !*** ./src/finally.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\n//实现finally方法\nPromise.prototype.finally = function (fn) {\n  var _this = this;\n\n  return new Promise(function (resolve, reject) {\n    _this.then(function (v) {\n      resolve(v);\n      fn(v);\n    }, function (r) {\n      reject(r);\n      fn(r);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/finally.js?");

/***/ }),

/***/ "./src/forBrowser.js":
/*!***************************!*\
  !*** ./src/forBrowser.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n//仅在打包时候用，用来生成浏览器script标签引入的文件\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\nwindow.Promise = Promise;\n\n//# sourceURL=webpack:///./src/forBrowser.js?");

/***/ }),

/***/ "./src/promise.js":
/*!************************!*\
  !*** ./src/promise.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _require = __webpack_require__(/*! ./tool */ \"./src/tool.js\"),\n    isThenAble = _require.isThenAble;\n\nvar STATUS = __webpack_require__(/*! ./status */ \"./src/status.js\");\n\n/**\r\n * 更改Promise状态，并通知下一个promise的方法\r\n * 通过call方法调用，改变this指向promise\r\n * **/\nfunction resolve(value) {\n  if (this.status !== STATUS[0]) return;\n  this.status = STATUS[1];\n  this.value = value;\n\n  if (this.nextPromise instanceof Promise && this.nextPromise.onFulfilled[0] instanceof Function) {\n    this.nextPromise.onFulfilled[0](this.value);\n  }\n}\nfunction reject(reason) {\n  if (this.status !== STATUS[0]) return;\n  this.status = STATUS[2];\n  this.reason = reason;\n\n  if (this.nextPromise instanceof Promise && this.nextPromise.onRejected[0] instanceof Function) {\n    this.nextPromise.onRejected[0](this.reason);\n  }\n}\n/**\r\n * 封装onfulfill和onreject的方法,注册为then生成的promise2的onfulfill和onreject回调\r\n * @Params onFulfill  then方法调用时候传入的onFulfill回调，onreject同理\r\n * @Params promise2   then方法生成并返回的promise\r\n * **/\n\n/**\r\n * 下面根据规范进行onFulfill和onReject的判断\r\n * 1.如果 onFulfilled 或者 onRejected 返回一个值 ，根据值进行  下面处理x的流程处理。\r\n * 2.如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e\r\n * 3.如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值\r\n * 4.如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因\r\n * **/\nfunction onFulfillRegister(onFulfill, promise2) {\n  return function (value) {\n    /** @Param value 上一个promise成功执行后，传递给下个promise2的value**/\n    if (!(onFulfill instanceof Function)) {\n      resolve.call(promise2, value);\n      return;\n    }\n    var result = void 0;\n    try {\n      result = onFulfill.call(undefined, value);\n    } catch (e) {\n      reject.call(promise2, e);\n      return;\n    }\n    _resolveX(result, promise2);\n  };\n}\nfunction onRejectRegister(onReject, promise2) {\n  return function (reason) {\n    /** @Param reason 上一个promise成功失败后，传递给下个promise2的reason**/\n    if (!(onReject instanceof Function)) {\n      reject.call(promise2, reason);\n      return;\n    }\n    var result = void 0;\n    try {\n      result = onReject.call(undefined, reason);\n    } catch (e) {\n      reject.call(promise2, e);\n      return;\n    }\n    _resolveX(result, promise2);\n  };\n}\n\n/**\r\n * 处理x返回值的流程\r\n * @params result  用户输入的onfulfill或者onreject的返回值x\r\n * @params promise2\r\n * **/\nfunction _resolveX(result, promise2) {\n  if (result === promise2) {\n    reject.call(promise2, new Error(' TypeError'));\n    return;\n  }\n  if (result instanceof Promise) {\n    switch (result.status) {\n      case STATUS[0]:\n        result.then(resolve.bind(promise2, value), reject.bind(promise2, reason));\n        break;\n      case STATUS[1]:\n        resolve.call(promise2, result.value);\n        break;\n      case STATUS[2]:\n        reject.call(promise2, result.reason);\n        break;\n    }\n    return;\n  }\n  var then = void 0;\n  try {\n    then = result.then;\n  } catch (e) {\n    reject.call(promise2, e);\n    return;\n  }\n  if (isThenAble(result)) {\n    var triggered = false;\n    try {\n      then.call(result, function resolvePromise(y) {\n        if (triggered) return;\n        triggered = true;\n        _resolveX(y, promise2);\n      }, function rejectPromise(r) {\n        if (triggered) return;\n        triggered = true;\n        reject.call(promise2, r);\n      });\n    } catch (e) {\n      triggered && reject.call(promise2, e);\n    }\n    return;\n  }\n  resolve.call(promise2, result);\n}\n\n/**\r\n * Promise类的主函数\r\n * 这里并没有将属性设置为私有变量，也没有用属性定义方法更改属性可修改性\r\n * 实际使用中，用户不应该可以去更改这些属性，但是对于\r\n * **/\nfunction Promise(fn) {\n  var _this = this;\n\n  this.status = STATUS[0];\n  this.value = undefined;\n  this.reason = undefined;\n\n  this.nextPromise = undefined;\n  this.onFulfilled = [];\n  this.onRejected = [];\n\n  //如果没有输入\n  try {\n    //第一个启动的promise中，用户resolve的值是需要进行结果处理的，比如，如果用户resolve了一个Promise，第一个promise是要进行resolve流程的\n    fn(function (v) {\n      return _resolveX(v, _this);\n    }, reject.bind(this));\n  } catch (e) {\n    reject.call(this, e);\n  }\n}\nPromise.prototype.then = function (onFulfilled, onRejected) {\n  var promise2 = new Promise(function () {});\n  //用户输入的两个回调函数只是处理数据，promise的实现中，需要在数据处理后，进行promise状态改变并通知下一个\n  //promise.所以，实际注册的promise需要进行封装\n  promise2.onFulfilled.push(onFulfillRegister(onFulfilled, promise2));\n  promise2.onRejected.push(onRejectRegister(onRejected, promise2));\n  /**\r\n   * @link http://www.ituring.com.cn/article/66566\r\n   * **/\n  this.nextPromise = promise2;\n  //如果上一个promise已经结束，then生成的promise需要直接去触发注册好的回调\n  if (this.status === STATUS[1]) {\n    promise2.onFulfilled[0](this.value);\n  } else if (this.status === STATUS[2]) {\n    promise2.onRejected[0](this.reason);\n  }\n  return promise2;\n};\nmodule.exports = Promise;\n\n/** 附加实现的一些方法，需要放在module.exports后面，具体原因需要去理解nodeJs 模块加载的实现方法，看源码去吧。。 **/\n\n//实现Promise.resolve()和Promise.reject()\n__webpack_require__(/*! ./returnPromise */ \"./src/returnPromise.js\");\n//实现catch方法\n__webpack_require__(/*! ./catch */ \"./src/catch.js\");\n//实现finally方法\n__webpack_require__(/*! ./finally */ \"./src/finally.js\");\n//实现Promise.race方法\n__webpack_require__(/*! ./race */ \"./src/race.js\");\n//实现Promise.all方法\n__webpack_require__(/*! ./all */ \"./src/all.js\");\n\n//# sourceURL=webpack:///./src/promise.js?");

/***/ }),

/***/ "./src/race.js":
/*!*********************!*\
  !*** ./src/race.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\n\n//race方法\nPromise.race = function (arr) {\n\n  return new Promise(function (resolve, reject) {\n    if (!(arr instanceof Array)) {\n      reject(new TypeError(arr + 'is not iterable'));\n    } else {\n      Array.prototype.forEach.call(arr, function (v) {\n        resolve(Promise.resolve(v));\n      });\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/race.js?");

/***/ }),

/***/ "./src/returnPromise.js":
/*!******************************!*\
  !*** ./src/returnPromise.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Promise = __webpack_require__(/*! ./promise */ \"./src/promise.js\");\n//实现Promise.resolve()和Promise.reject()\nPromise.resolve = function (v) {\n  return new Promise(function (resolve) {\n    resolve(v);\n  });\n};\nPromise.reject = function (r) {\n  return new Promise(function (resolve, reject) {\n    reject(r);\n  });\n};\n\n//# sourceURL=webpack:///./src/returnPromise.js?");

/***/ }),

/***/ "./src/status.js":
/*!***********************!*\
  !*** ./src/status.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * Promise的状态\r\n * 等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。\r\n * **/\n\nvar status = ['Pending', 'Fulfilled', 'Rejected'];\n\nmodule.exports = status;\n\n//# sourceURL=webpack:///./src/status.js?");

/***/ }),

/***/ "./src/tool.js":
/*!*********************!*\
  !*** ./src/tool.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar status = __webpack_require__(/*! ./status */ \"./src/status.js\");\n\nexports.isThenAble = function (obj) {\n  if (obj instanceof Object || obj instanceof Function) {\n    return obj.then && obj.then instanceof Function;\n  }\n  return false;\n};\n\nexports.changeAble = function (obj) {\n  return obj.status === status[0];\n};\n\n//# sourceURL=webpack:///./src/tool.js?");

/***/ })

/******/ });