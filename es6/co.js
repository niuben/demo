var co = require("co");
co(function*(){
    yield {a: 1};    
    yield {a: 2};
    yield {a: 3};
});
