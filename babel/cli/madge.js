const madge = require('madge');

madge('visitor.js', {
	includeNpm: "node_modules"
}).then((res) => {
    console.log(res.obj());
});


