var _ = require("underscore");

console.log("_", _);

function condition(/**/){
    var validators = _.toArray(arguments);
    return function(fun, arg){
        var errors = _.map(validators, function(isValid){
            if(isValid(arg)){
                return [];
            }else{
                return false;
            }
        })

        if(!_.isEmpty(errors)) throw new Errors(errors.join(""));

        return fun(arg);
    }
}

function cat(){
	var head = _.first(arguments);
	if(typeof head == "object"){
  	    return head.concat.apply(head, _.rest(arguments));    
    }else{
  	    return [];
    }  
}


//验证
function validator(error, fun){
    var mess = {};
    return function(){
        var status = fun.apply(fun, _.toArray(arguments));
        if(status == false){
            return {
                status,
                error
            }
        }
    }
}

//条件判断
function condition1(){
    var validators = _.flatten(_.toArray(arguments));
    return function(fun, /* argus */){
        var argus = _.rest(arguments);
        var errors = [];
        validators.map(function(valid, index){
            var msg = valid.apply(valid, argus);
            if(_.isObject(msg) && msg.status == false){
                errors.push(msg.error);
            }            
        });        

        if(_.isEmpty(errors)){  
            return fun.apply(fun, argus);
        }        
        return errors;
    } 
}

function partial(fun){
    var argus = _.rest(arguments);
    return function(){
        return fun.apply(fun, cat(argus, _.toArray(arguments)));
    }
}

// function div(x, y){
//     return x / y;
// }
// var div10 = partial(div, 10);

// var checkSqr = function(n){
//     if(typeof n != "number") {
//         throw new Error("n是一个数字");
//     }
// }

// 
var checkSqr = [
    validator("this is number", _.isNumber),
    validator("this is check!", function(n){
        return false;
    })];


var checkNum = condition1(
    checkSqr, 
    validator("it must be lower 10", function(n){
        return n < 10;
    })
);

var unCheckSqr = function(n, m) {
    return n * m;
}

// var sqr = partial(_.compose(checkSqr, checkNum), unCheckSqr); //

// var sqr = partial(partial(checkSqr, checkNum), unCheckSqr); //
var sqr = partial(checkNum, unCheckSqr);
console.log(sqr("2", 3));