const fs = require('fs');
var data = fs.readFileSync('./day1/input.txt').toString();

var result = data.split('\n').map(a => Number(a)).reduce((a, b) => a + b);
console.log(result);