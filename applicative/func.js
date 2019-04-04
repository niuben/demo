/*
* 函数式编程的好处：
* 1. 可以最大化发挥函数的优势;
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
*/ 
log(_.reduce([1, null, 1], function(total, num) {
    return total * num;
}));

/*
* 5. 由函数构造函数
    多态函数：同一操作，使用不同对象，显示出不同结果;
*/ 


