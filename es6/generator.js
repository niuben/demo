let fs = require('fs')

function readFile (filename) {
  return function (callback) {
    fs.readFile(filename, callback)
  }
}

function run (taskDef) {
  // 创建迭代器，让它在别处可用
  let task = taskDef()
  // 启动任务
  let result = task.next() //生成器执行后是一个函数；
  console.log(result);
  // 递归使用函数来保持对 next() 的调用
  function step () {
    // 如果还有更多要做的
    if (!result.done) {
      if (typeof result.value === 'function') {
        result.value(function (err, data) {
          
            if (err) {
                result = task.throw(err);
                return
            }          
            console.log("if", data);
            result = task.next(data);
            step();
        })
    } else {
        console.log("else", result.value);
        result = task.next(result.value);
        step();
      }
    }
  }
  // 开始处理过程
  step()
}


// var createIterator = function * () {
//     let contents = yield readFile('./demo/es6/generator.html');
//     console.log("contents", contents);
//     // console.log('Done');
// }
//     // run(createIterator);
    
// run(createIterator);

// 异步编程
var readFile1 = function(name){
    return function(callback){
        var duration = name == "content1" ? 2000 : 1000;                
        setTimeout(function(){
            console.log("name", name, "duration", duration);                                            
            callback && callback(duration);
        }, duration);
    }
}

var createIterator1 = function*(){    
    var content1 = yield readFile1("content1");
    var content2 = yield readFile1("content2");
    console.log(content1);
    console.log(content2);
}

function runTask(func){
    var task = func();
    var result = task.next();
        
    function step(){

        if(result.done == true){
            return;
        }

        if(typeof result.value == "function"){
            result.value(function(data){
                result = task.next(data);
                step();
            });
            
        }else{
            result = task.next(data);  
            step();
        }        
    }
    step();
}

// var iterator1 = createIterator1();
// console.log(iterator1.next());
runTask(createIterator1);


//生成器传值
// var createIterator2 = function*(){
//     var first = yield 1;
//     var second = yield first + 2;
//     var third = yield second + 3;
// }

// var iterator2 = createIterator2();
// console.log(iterator2.next());
// console.log(iterator2.next(2)); //4
// console.log(iterator2.next(3)); //6
