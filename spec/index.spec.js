const Promise = require('../index');
// require('jasmine');
// require('jasmine-core');
exports.deferred = function () {
  let resolve, reject;
  let promise = new Promise(function (_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  };
};
exports.resolved = Promise.resolve;
exports.rejected = Promise.reject;
// describe("Promises/A+ Tests", function () {
//   require("promises-aplus-tests").mocha(exports);
// });

// describe("Promise test", function() {
//   it("constructor test", function() {
//     let p0 = new Promise((resolve,reject)=>{
//
//     });
//     let p1 = new Promise((resolve,reject)=>{
//       resolve(1);
//     });
//     let p2 = new Promise((resolve,reject)=>{
//       reject(2);
//     });
//
//     expect(p0.status).toBe(status[0]);
//     expect(p1.status).toBe(status[1]);
//     expect(p2.status).toBe(status[2]);
//   });
//
//   it('then function test', function () {
//
//     let p = new Promise((resolve,reject)=>{
//
//     })
//
//
//
//
//
//   })
//
// });

