var fs = require('fs');
var  xlsx = require('node-xlsx');
// Or var xlsx = require('node-xlsx').default;  
 
// Parse a buffer 
var workSheetsFromFile = xlsx.parse("./527.xlsx");

// console.log(workSheetsFromFile[0].data[1]);)

var data = workSheetsFromFile[0].data;
// console.log(data);

// console.log(data[1]);
// console.log(data[1].length);
var list = [];

for( var i = 0; i < data.length; i++) {
	var curData = data[i];
	var num = curData.length;
	if(num <= 4) {
		list.push(curData);
		continue;
	}
	var loopNum = num / 4;

	for(var x = 0; x < loopNum; x++ ){
		var line = [];
		for(var y = 0; y < 4; y++ ) {
			line.push(curData[x + y * loopNum]);
		}
		list.push(line);
	}
}

var buffer = xlsx.build([{name: "newdata", data: list}]);
 fs.writeFileSync("527-new.xlsx", buffer, 'binary');