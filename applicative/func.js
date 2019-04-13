/*
* 函数式编程的好处：
* 1. 可以最大化发挥函数的优势;
* 2. 尾递归

*/
var _ = require("underscore");
function log(){
    console.log.apply(null, _.toArray(arguments));
}
/*
----------------开始函数-------------------------
*/
[1, 2, 3].forEach(function(num){
    console.log(num);
});

function splat(fun){
    return function(array){
        return fun.apply(null, array);
    }
}

//  一个返回函数的函数
var add = splat(function(x, y){return x + y});  //？怎么用_进行相加
console.log(add([1, 2, 3, 4]));

function unsplat(fun){
    return function(){
        return fun.call(null, _.toArray(arguments));
    }
}
var joinArray = unsplat(function(array){
    return array.join(" ");
});
console.log(joinArray(1, 2, 3, 4, 5));
//JS的一些局限：变量灵活性、



//以函数为行动单元，比如选择数组中值
function nativeNth(arr, index){
    return arr[index];
}
console.log(nativeNth([1, 2, 3], 2));

//行动比较为单元
console.log([-1, -3, 0].sort());


//数据建模
// name, age, hair
// Merble, 35, red 
// Bob, 64, blonde
function loadCSV(str){
    return _.reduce(str.split("\n"), function(table, row){
        table.push(_.map(row.split(","), function(c){
            return c.trim();
        }));
        return table;
    }, []);
}
var peopleTable = loadCSV("name, age, hair\n Merble, 35, red\n Bob, 64, blonde");
console.log("csv", peopleTable);
console.dir(_.rest(peopleTable));


//是否存在
function existy(c){
    return c != null;
}
console.log(existy(null), existy(undefined), existy({}.noHere), existy(true));

function truely(c){
    return c !== false && existy(c);
}

console.log("_.reduce", _.reduce([1, 2, 3], function(table, num){
    table.push([num + 1]);
    return table;
}, []));

console.log("_reduceRight", _.reduceRight([1, 2, 3], function(table, num){
    table.push([num + 1]);
    return table;
}, []));

console.dir("_.map", _.map([1, 2, 3], function(num){
    return [num + 1];
}));


//代码内联

//静态分析器

//谷歌闭包编译器



//----------------Applicative函数-------------------
function cat(){
	var head = _.first(arguments);
	if(typeof head == "object"){
  	    return head.concat.apply(head, _.rest(arguments));    
    }else{
  	    return [];
    }  
}
console.log(cat([1, 2, 3], [4, 5]));



//将数组和数字联系在一起
function construct(head, tail){
    return cat([head], _.toArray(tail));
}
console.log(construct(12, [2, 3, 4]));


//循环数组
function mapCat(fun, coll){
    return cat.apply(null, _.map(coll, fun));
}

console.log(mapCat(function(e){    
    return construct(e, [""]);
}, [1, 2, 3])); //为什么会给每个选项加一个，因为map会创建一个数组，return的值会增加到这个数组中;


//去掉最后一个逗号
function butLast(coll){
    return _.toArray(coll).slice(0, -1);
}

function interpose(coll, inter){
    return butLast(mapCat(function(e){    
        return construct(e, [inter]);
    }, coll));
}
console.log(interpose([1, 2, 3], ","));

//------------------  数据思考: 把未命名的对象看作一个简单的数据存储
// 关联数据技术
var zomble = {"name": "a", "film": "Day of the Dead"};
console.log(_.keys(zomble), _.values(zomble), _.pluck([zomble], "film"), _.invert(zomble), _.omit(zomble, "name"), _.pick(zomble, "name"));


//把对象集合像SQL一样操作
var table = [{a: 1, b: 1}, {a: 2, b: 2}, {a: 1, b: 3}];
console.log(_.where(table, {a:1}), _.findWhere(table, {a:1}));

//像sql一样选择数据
function where(table, key){
    return _.where(table, key);
}
console.log(where(table, {a: 1}));
console.log(_.pluck(where(table, {a: 1}), "a"));

function project(table, keys){
    return _.map(table, function(obj){
        return _.pick.apply(null, construct(obj, keys));
    });
}
console.log(project(table, ["a", "b"]));

//数据库重命名
function rename(){

}


/*
----------- 作用域和闭包-------------
1. 全局作用域
2. 语法作用域
3. 动态作用域
*/
var globals = {};
function makeBindFun(resolver){
    return function(k, v){
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals;
    }
}
var stackBinder = makeBindFun(function(stack, v){
    stack.push(v);
    return stack;
});
var stackUnbinder = makeBindFun(function(stack){
    stack.pop();
});
var dynamicLookup = function(k){
    var slot = globals[k] || [];
    return _.last(slot);
}
console.log(stackBinder("a", 1), stackBinder("b", 100));
console.log(globals);
console.log(dynamicLookup("a"));

stackBinder("a", "*");
console.log(dynamicLookup("a"));

function f(){
    return dynamicLookup('a');
}

function g(){
    stackBinder("a", "g");
    return f();
}


//绑定作用域
// _.bind(); _.bindAll


//动态作用域缺点：任何给定的绑定的值，在确定调用其函数之前，都是不可知的;
console.log(f(), g(), globals);

//动态this
function globalThis(){
    return this;
}

console.log(globalThis(), globalThis.apply("111"), globalThis.call("222", []));


//函数作用域： hoisting变量上提
function strangeIndentity(){
    for (let i = 0; i < array.length; i++);
    return i;
}
console.log(strangeIndentity);

//闭包
function whatWasTheLocal(){
    var CAPTURED = "Oh hai"
    return function(){
        return "this is " + CAPTURED
    }
};
console.log(whatWasTheLocal()());


//自由变量: 闭包函数可以对内部变量和参量进行锁定;
function makeAdder(num){        
    return function(num1){
        return num + num1;
    }
}
var add10 = makeAdder(10);
console.log(add10(20));

//使用闭包锁定函数和变量
var isEven = function(num){
    return num % 2 == 0;
}
function complement(fun){
    return function(){
        return !fun.apply(this, _.toArray(arguments));
    }
}
var isOdd = complement(isEven);
console.log(isOdd(2), isOdd(3));

var isEven = function(){
    return false;    
}
console.log("isEven改变:", isOdd(2), isOdd(3));

//锁定
var object = {
    n: 12
}

function showObject(obj){
    return function(){
        return obj.n
    }
};
console.log(showObject(object)());
object.n = 10;
console.log("对象数据改变:", showObject(object)());

//为什么函数不会变而对象发生变化：因为函数引用的值没变，对象的值改变了;

//怎么创建一个无法访问的内部变量，实现访问保护的功能;
var pingpong = (function(){
    var PRIVATE = 0;
    return {
        inc: function(n){
            return PRIVATE += n;
        },
        dec: function(n){
            return PRIVATE -= n;
        }
    }
})();

try{
    pingpong.div = function(n){
        // return PRIVATE / n;
    }
}catch(e){

}
console.log(pingpong.inc(10), pingpong.dec(5), pingpong.div(3));

//闭包抽象: 实现
var object = {"title": "123", "height": "190", "width": "200"};
function plucker(name){
    return function(obj){
        return (obj && obj[name]);
    }
}

var getTitle = plucker("title");
console.log("title", getTitle(object));


/*
------------4 高阶函数-------------------
1. 使用函数作为参数
2. 返回函数的函数
3. 
*/ 

/*
    4.1.1 传递函数的思考
*/
console.log(_.max([1, 2, 3]), _.max([{a: 1, age: 12}, {a: 2, age: 11}], function(obj){ return obj.a;}));

/*

*/
function finder(valueFun, bestFun, coll){
    return _.reduce(coll, function(best, current){
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);
        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    });
}

console.log("finder", finder(_.identity, Math.max, [1, 10, 3, 5]), finder(plucker("a"), Math.max, [{a: 1}, {a: 2}]));
/*
_.max和finder的区别：_.max比finder函数有局限性，因为它只能比较大小，finder函数通过自定义比较函数可以做各种比较
*/
console.log("finder Y", finder(plucker("name"), function(x, y){    
    return x.charAt(0) == "Y" ? x : y;
}, [{"name": "Bare"}, {"name": "Yare"}, {"name": "Ybre"}]));


/*
* 简化版finder
*/
function simpleFinder(fun, coll){
    return _.reduce(coll, function(x, y){
        return fun(x, y) ? x : y;
    });
}
console.log("simpleFinder", simpleFinder(function(x, y){
    return x > y;
}, [1, 4, 3]));

/*
* 4.1.2 函数重复
*/ 
function repeat(num, value){
    return _.map(_.range(num), function(){
        return value;
    });
}
log("repeat", repeat(4, "aaa"));

function repeatness(num, fun){
    return _.map(_.range(num), fun);
}
log("repeatness", repeatness(3, function(){
    return _.random(3) > 1 ? "bbb" : "ccc";
}));

/*
* 前置函数：一次函数计算的结果当做下一次函数的值;
*/
function repeatly(loopFun, fun, firstValue){
    
}

/*
*   4.2 返回其他函数的函数
    闭包的两个特点：
        1. 闭包可以返回相同的参量
        2. 一个新的闭包会
*/
function always(VALUE){
    return function(){
        return VALUE;
    }
}


/*
4.2.0 组合子(combinator)、多态函数
*/



/*
4.2.1 高阶函数捕获变量

这样做的好处是：可以通过闭包固定参量的值,
{function(){})()和function(){}再闭包情况下区别是什么？ 前一个是命名时候就执行了，后一个需要再调用一次;
引用透明：
*/
var add100 = makeAdder(100);
log(add100(38));

/*
* 4.2.2 防止不存在的函数：fnull, 
* fnull好处是可以懒惰式调用，只有在运行时才调用;
*/ 
var numArr = [1, 2, 3, 4, null];
log("null:", _.reduce(numArr, function(total, num) {
    return total * num;
}), _.reduce(_.pluck([{num: 1}, {num: null}], "num"), function(total, num){
    return total * num;
}), _.reduce(numArr, function(total, num) {
    return existy(num) ? total * num : total;
}));

//safeMute
function fnull(fun, /*, defaults */){
    var defaults = _.rest(arguments);
    return function() {
        var args = _.map(arguments, function(num, i){
            log("num", num, existy(num) ? num : defaults[i]);
            return existy(num) ? num : defaults[i];
        });        
        return fun.apply(null, args);
    }
}

var safeMute = fnull(function(total, n){
    return total * n;
}, 1, 1);


log("safeMute1", _.reduce(numArr, safeMute));
log("defaults", _.reduce(numArr, _.identity));
//解决配置项问题

/*
*  underscore _.chain方法
*/
log("_.chain", _.chain(numArr).map(function(num){
    return num * 10;
}).reverse().first().value());

/*
*  检查表单
*/
function checker(){
    var validators = _.toArray(arguments);
    return function(obj){
        return _.reduce(validators, function(errs, check){
            if(check(obj)){
                return errs
            }else{
                return _.chain(errs).push(check.message).value()
            }
        }, []);
    }
}
log("checker true", checker(always(true), always(true))({}));

var fails = always(false);
fails.message = "this is error";

log("checker false", checker(fails)({}));
function validator(message, fun){      
    var f = function(){
        return fun.apply(fun, arguments);
    }
    f["message"] = message;
    return f;
}
log("validator", checker(validator("validator fail", always(false)))({}))

//还没有第二种写法??
function validator2(message, fun){
    fun["message"] = message;
    return fun
}
log("validator2", checker(validator2("validator2 fail", always(false)))({}))

//使用其他的函数
var isObj = function(obj){
    return _.isObject(obj);
}
var checkObject = checker(validator2("this is not object!", isObj));
log("validator2", checkObject({}));

//_.every和_.map区别
log(_.every([1, 2, 3], function(num){
    return num > 0;
}))




/*
* 5. 由函数构造函数
    多态函数：同一操作，使用不同对象，显示出不同结果;
*/
/*
*
* 
*/ 
function stringReverse(s){
    if(!_.isString(s)) return undefined;
    return s.split('').reverse().join("");
}
console.log(stringReverse("123"));


//组合多个行动;
function dispatch(){        
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function(target, /*, args*/){
        var ret = undefined;
        var args = _.rest(arguments);

        for (var i = 0; i < size; i++) {
            var fun = funs[i];
            ret = fun.apply(fun, construct(target, args));

            if(existy(ret)) return ret;
        }
        return ret;
    }
}

log("construct", construct(1, [2, 3, 4]));
// var rev = dispatch("reverse", Array.prototype.reverse);
var rev = dispatch(stringReverse, );
log("rev", rev("1234"));

//dispatch消除if和else
function isa(type, fun){
    return function(obj){
        if(type == obj.type){
            return fun.call(fun, obj);
        }
    }
}

var performCommand = dispatch(isa("aaa", function(){
    return "aaa";
}), isa("bbb", function(){
    return "bbb";
}));

log("performCommand", performCommand({"type": "aaa"}));


/*
* 柯里化(currying)
* -------------------------
* function(a, b, c){ return a; }  
* 
    function(a, b, c){ 
        return c;
    }
    function c(a, b){
        return b;
    }
    function b(){
        return a;
    }
* -------------------------     
*/
function rightCurrying(){
    var args = _.toArray(arguments);
    var method = args.shift();
    // var target = args.shift();

    return method.apply(null, args); 
} //只能适用于数组???
// log(rightCurrying(Array.prototype.reverse, [1, 2, 3]));
log(rightCurrying(cat, [1, 2, 3], [4], [5]));

/**
 * 接收一个方法，在任何给定的对象上调用它 ⭐️
 * 意义在于：
 *     把方法变成了函数，比如下面的 map，本来是 arr.map 现在变成了一个函数
 *     并且做好了兼容，对象调用本身没有的方法时，就返回 undefined
*/
function doWhen(condition, fun){
    if(condition == true){
        return fun();
    }
}

function invoker(name, method){
    return function(target){
        if(!existy(target)){
            console.warn('must provide a target');
            return ;
        }
        var targetMethod = target[name]; // 得到方法
        var args = _.rest(arguments); // 调用对象就要放到参数中，而原来的参数就是 _.rest(arguments)

        return doWhen(existy(targetMethod) && method===targetMethod, function(){
            return targetMethod.apply(target, args);
        });
    };
}

var rev = invoker("reverse", Array.prototype.reverse);

console.log("rev", rev([1, 2, 3]));

function partial1(fun, arg1){
    return function(){
        var arg = construct(_.toArray(arguments), arg1);
        return fun.apply(fun, arg);
    }
}

//左右柯里化函数
function rightCurry(n){
    return function(d){
        return n/d;
    }
}

function leftCurry(n){
    return function(d){
        return d/n;
    }
}

function curry(fn){
    return function(target){
        return fn(target);
    }
}

log("right", rightCurry(10)(2), "left", leftCurry(10)(2));
log("parseInt", _.map(["11", "11", "11"], parseInt));
log("curry", _.map(["11", "11", "11"], curry(parseInt)));

//双函数柯里化
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

var parseInt2 = curry2(parseInt)(2);
log("parseInt2", parseInt2("111"));


//"_.countBy: 可以计算1"
log("_.countBy", _.countBy([1, 2, 3], function(num){
    return 1;
}));

var count = curry2(_.countBy)(function(num){
    return "123-123";
});

log("curry2", count([1, 2, 3]));

function curry3(fn){
    return function(thirdArg){
        return function(secondArg){
            return function(firstArg){
                return fn(firstArg, secondArg, thirdArg);
            }
        }
    }
}

log(curry3, curry3(_.map)()(function(num){
    return num + 1;
})([12, 1, 2]));


//函数组合
log("_compose", _.compose(function(x){
    return !x
}, _.isBoolean, _.isNumber, _.isDate)(1));



//递归的核心是：一个子问题是由一个更大问题分解出来的;
function myLength(arg){
    if(_.isEmpty(arg)){
        return 0
    }else{
        return 1 + myLength(_.rest(arg));
    }
}
log("myLength", myLength([1, 2, 3]));


//使用递归的方式复制函数
function cycle(times, arr){
    if(times <= 1){
        return arr;
    }else{
        return cat(arr, cycle(times - 1, arr));
    }
}
log("cycle", cycle(4, [1, 2, 3]));

/*
递归的三个步骤
1. 结束条件
2. 计算
3. 下一步动作或者分解成更小的问题
*/
var graphArr = [
    ['Lisp', "Smalltalk"],
    ['Lisp', "Scheme"],
    ['Smalltalk', 'Self'],
    ['Scheme', 'Javascript'],
    ['Scheme', 'Lua'],
    ['Self', 'Lua'],
    ['Self', 'Javascript']
];

/*
* 能不能优化了？？？
* 循环结构; 并且没有结束条件
* _.map函数用在递归方面的
*/
function next(graph, node){
    var link = [];
    _.map(graph, function(selfNode){  //结束条件
        if(_.isArray(selfNode)){
            link = cat(next(selfNode, node), link);  //下一步
            return;
        }

        if(selfNode == node){
            link = cat(_.without(graph, node), link); 
        }
    });
    return link; //结束条件
}

/*
* 线性结构
*/ 
function next(graph, node){
    if(_.isEmpty(graph)) return [];   //结束条件
    
    var arr = [];
    var first = _.first(graph);
    var rest = _.rest(graph);

    if(_.contains(first, node)){
        return cat(_.without(first, node), next(rest, node));   //一个步骤
    }else{
        return cat(next(rest, node), arr);  //下一步
    }        
}

log("recursion", next(graphArr, "Self"));

//深度优先自递归
function depthSearch(graph, nodes, seen){   //尾递归: 最后一个动作是递归;
    if(_.isEmpty(nodes)) return rev(seen); //结束条件

    var node = _.first(nodes);
    var more = _.rest(nodes);

    if(_.contains(seen, node)){
        return depthSearch(graph, more, seen);  //一步操作
    }else{
        return depthSearch(graph,       //缩小内容
                           cat(next(graph, node), more), //
                           construct(node, seen));
    }
}
log("depthSearch", depthSearch(graphArr, ["Lisp"], []));


/*
* 关联函数
*/
function evenSteven(n){
    if(n == 0)
        return true;
    else    
        return oddJohn(Math.abs(n) - 1);
}   

function oddJohn(n){
    if(n == 0)
        return true;
    else    
        return evenSteven(Math.abs(n) - 1);
}   

log("oddJohn", oddJohn(1));

//将多维数组变成一维数组;
function flat(array){

    if(_.isArray(array)){
        return cat.apply(cat, _.map(array, flat)); //缩小内容 //一步动作;
    }else{
        return [array];   //结束条件
    }    
}
log("flat", flat([1,2,3, [4, [5]]]));

/*
* 修改
*/ 
function evenSteven1(n){
    if(n == 0)
        return true;
    else    
        return partial1(oddJohn1, Math.abs(n) - 1);
}   

function oddJohn1(n){
    if(n == 0)
        return true;
    else    
        return partial1(evenSteven1, Math.abs(n) - 1);
}

//蹦床
function trampoline(fn, /**/){
    var arg = _.rest(arguments);
    var result = fn.apply(fn, arg);

    while(_.isFunction(result)){
        result = result();
    }

    return result;
}


log("evenSteven1", trampoline(evenSteven1, 10000000))

//太多递归了
try{
    log("evenSteven", evenSteven(1000000)());
}catch(e){
    console.log(e);
}

//水平调用
log("partial1", evenSteven(1));


/*
* 函数的不可变性 
*/
var s = "abc";
log(s.toUpperCase(), s);