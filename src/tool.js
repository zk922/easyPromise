exports.isThenAble = function(obj){
  return obj.then && obj.then instanceof Function;
};
