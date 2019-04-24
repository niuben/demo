var _ = require("underscore");

function log(){
    console.log.apply(null, _.toArray(arguments));
}

//
log("_.chain", _.chain([1, 2, 3]).map(function(num){
    return num + 1;
}).tap(note).reduce(function(sum, num){
    return sum + num;
}, 0).value());



//惰性链
function add(arr, num){
    return _.map(arr, function(item){
        return item + num;
    });
}

// function add10(arr){
//     return _.map(arr, function(item){
//         return item + 10;
//     });
// }

function note(num){    
    console.log("note", num);    
}

function LazyChain(target){    
    this.funs  = [];
    this.target = target;
}

LazyChain.prototype.invoke = function(methodName, /*argus*/){
    var argus = _.rest(arguments);
    this.funs.push(function(target){
        return target[methodName].apply(target, argus);
    });
    return this;
}
LazyChain.prototype.force = function(){
    var cloneTarget = _.clone(this.target);
    return _.reduce(this.funs, function(target, thunk){
        return thunk(target);
    }, cloneTarget);
}
LazyChain.prototype.tap = function(fun){
    // var target = this.target;
    this.funs.push(function(target){
        fun.call(fun, target);
        return target;        
    })
    return this;
}   

console.log("LazyChain", new LazyChain([0, 1, 2, 3]).invoke("concat", [1, 2, 3]).funs[0]([0, 1, 2, 3]));
console.log("LazyChain", new LazyChain([3, 2, 1, 0]).invoke("sort").force());
console.log("LazyChain", new LazyChain([3, 2, 1, 0]).invoke("sort").invoke("concat", [1, 2, 3]).force());
new LazyChain([3, 2, 1, 0]).invoke("sort").invoke("concat", [1, 2, 3]).tap(note).force();

/*
* 调用链改变了原始的target的值
*/ 
var arr = [3, 2, 1, 0];
var chain = new LazyChain(arr);
log("原始值:", chain.invoke("sort").force(), chain.target);