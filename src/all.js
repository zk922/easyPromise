const Promise = require('./promise');

//Promise.all方法实现
Promise.all = function(arr){

  return new Promise(function (resolve, reject) {
    if(!(arr instanceof Array)){
      reject(new TypeError(arr + 'is not iterable'));
    }
    else{
      const result = [];

      if(arr.length === 0){
        resolve(result);
      }
      else{
        let canResolve = function() {
          return result.length === arr.length;
        };

        let onFulfilled = function(i){
          return function (v) {
            result[i] = v;
            if(canResolve()){
              resolve(v);
            }
          };
        };

        let onRejected = function (r) {
          reject(r);
        };
        Array.prototype.forEach.call(arr, function (v,i) {
          Promise.resolve(v).then(onFulfilled(i), onRejected);
        });
      }
    }
  });


};

