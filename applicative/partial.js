var _ = require("underscore");

console.log("_", _);


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
function condition(){
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

function pipeline(target, /*funs*/){
    var funs = _.rest(arguments);
    return _.reduce(funs, function(curTarget, fun){
        return fun(curTarget);
    }, target);
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


var checkNum = condition(
    checkSqr,     
    validator("it must be lower 10", function(n){
        return n < 10;
    })
);

var unCheckSqr = function(n, m) {
    return n * m;
}

// var sqr = partial(checkNum, unCheckSqr);
// sqr(2, 3);

//把前置条件和后置条件分开
// 给函数增加后置条件的判断

// var suffixCheckSqr = condition(
//     validator("需要大于5", function(n){
//         return n < 5;
//     })
// )

// var suffixSqr = _.compose(suffixCheckSqr, sqr);
// console.log(suffixSqr(2, 3));


//如何用函数式重构登录页面
function login (callback) {
    var vote = checkbox.val();
    var phone = $.trim($phone.val());
    var code = $.trim($code.val());
    var $err = null;

    var err = false
    $phoneErr.html('');
    $codeErr.html('');
    
    if (phone == '手机号') {
        phone = ''
    }

    if (code == '验证码') {
        code = ''
    }

    if (phone == '') {
      $phoneErr.hide().html('请填写手机号').fadeIn()
      err = true
    } else if (!/^\d{11}$/.test(phone)) {
      $phoneErr.hide().html('请填写正确的手机号码').fadeIn()
      err = true
    } else if (code == '') {
      $codeErr.hide().html('请填写验证码').fadeIn()
      err = true
    }

    if (err) {
      callback()
      return
    }
    $phoneErr.html('')
    $codeErr.html('')
    $.get(URL.login, {
      phone: phone,
      code: code,
      _: new Date().getTime()
    }, 'json').done(function (data) {
      var infor = data.data;      
      if (code >= 0 && typeof infor == "object" && window.location.port == "1337") {
        for(var key in infor){                  
          $.cookie(key, infor.key,{
            path: "/",
            expires: 30,
          })
        }        
      }
      if (data.code == 0) {        
        location.reload()
      } else {
        alert(data.msg);
      }
      callback()
    }).fail(function (data) {
      alert(JSON.stringify(data))
      callback()
    })
  }


/*
* 重构一个表单提交;
* 1. 表单信息收集
* 2. 表单信息验证(UI处理)
* 3. 表单信息发送
* 4. 结果处理(UI处理)
*/ 

var getForm = function(){
    return {
        iphone: "130000001221",
        code: "4444"
    }
};

var checkForm = condition(
    validator("请填写手机号", function(phone, code){ 
        return !_.isEmpty(phone);
    }), validator("手机号格式不正确", function(phone, code){ 
        return /^\d{11}$/.test(phone);
    }), validator("验证码不为空", function(phone, code){
        return !_.isEmpty(code);
    })
);

var unCheckForm = function(phone, code){
    // $ajax...
    return {
        status: 1,
        error: "mess"
    }
};

var afterForm = function(mess){    
    if(mess.status == 1) {
        console.log("success");
    }else{
        console.log("error");
    }
}

// var form = _.compose(afterForm, partial(checkForm, unCheckForm), getForm);
console.log(pipeline(_.toArray(getForm()), partial(checkForm, unCheckForm), afterForm));

/*
关于前置判断总结：可以判断和操作分开，这样的话逻辑清楚且提高代码的复用率； 在数据操作类方向应用场景比较多;
关于后置判断总结：对操作结果进行判断？ 使用场景有哪些？ 其实要保证数据稳定性;
*/
