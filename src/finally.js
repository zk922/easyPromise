const Promise = require('./promise');
//实现finally方法
Promise.prototype.finally = function(fn){
  return new Promise((resolve, reject) => {
    this.then(
      v=>{
        resolve(v);
        fn(v);
      },
      r=>{
        reject(r);
        fn(r);
      })
  })
};