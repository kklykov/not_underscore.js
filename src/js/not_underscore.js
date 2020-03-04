(function() {
  console.log("start not_underscore.js");

  // setting the root object
  var root =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    this ||
    {};

  var not_ = function(obj) {
    if (obj instanceof not_) return obj;
    if (!(this instanceof not_)) return new not_(obj);
  };

  if (typeof exports != "undefined" && !exports.nodeType) {
    if (typeof module != "undefined" && !module.nodeType && module.exports) {
      exports = module.exports = not_;
    }
    exports.not_ = not_;
  } else {
    root.not_ = not_;
  }

  not_.VERSION = "0.0.1";

  // I took the previous code from the original underscore library

  not_.each = function(list, iteratee, context){
    if(list instanceof Array){
        list.forEach((element, index, list)=> {
            iteratee(element, index, list)
        });
    }else{
        let index = 0
        for(const prop in list){
            iteratee(list[prop], index, list)
            index++
        }
    }
    return list;
  }


})();
