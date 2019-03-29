function createPromise(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve(123);   
        }, 3000);
    });
}

createPromise().then(function(data){
    console.log("data", data);
});