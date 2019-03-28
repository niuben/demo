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
            step()
        })
    } else {
        console.log("else", result.value);
        result = task.next(result.value)
        step()
      }
    }
  }
  // 开始处理过程
  step()
}

run(function * () {
    let contents = yield readFile('./generator.html');
    //   doSomethingWith(contents)
    console.log(contents);
    console.log('Done')
})
