const status = require('./status');


exports.isThenAble = function(obj){
  if(obj instanceof Object || obj instanceof Function){
    return obj.then && obj.then instanceof Function;
  }
  return false;
};

exports.changeAble = function (obj) {
  return obj.status === status[0];
};