const status = require('status')


exports.isThenAble = function(obj){
  return obj.then && obj.then instanceof Function;
};

exports.changeAble = function (obj) {
  return obj.status === status[0];
};