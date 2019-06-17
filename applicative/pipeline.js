/* 
* 管道和惰性链的区别
* 管道和惰性链区别: 避免函数名命名，管道不太适合去做一些异步操作;
* 管道的优点： 可以将琐碎的函数组合在一起从而实现一个功能，同时管道和管道也可以组合在一起; 函数
* 链和管道使用的场景： 一组数据需要被多个方法调用，这些方法具有一定的相关性;
*/
var _ = require("underscore");
function log(){
    console.log.apply(null, _.toArray(arguments));
}

//lazy pipelien
function pipeline(target, /*funs*/){
    var funs = _.rest(arguments);
    return _.reduce(funs, function(curTarget, fun){
        return fun(curTarget);
    }, target);
}


function twice(target){
    return pipeline(target, _.rest, _.rest);
}


log(pipeline([1, 2, 3, 4, 5], twice, twice));

log(pipeline(), pipeline(42), pipeline([0, 1, 2], function(n, num){ return -n}));