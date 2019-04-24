/*
* 柯里化：局部运用
*/
function curry2(fn){
    return function(rightArg){
        return function(leftArg){
            return fn(leftArg, rightArg);
        }
    }
}
log(curry2(function(n, d){
    return n/d
})(10)(2));
