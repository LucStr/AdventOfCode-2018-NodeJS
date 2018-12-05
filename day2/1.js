const fs = require('fs');
var data = fs.readFileSync('./day2/input.txt').toString().split('\n');

var count = [];
var charCount = data.map(a => {
    var count = [];
    a.split('').forEach(b => count[b] = count[b] ? count[b] + 1 : 1);
    var values = Object.values(count)
    return values.filter((a, i) => a > 1 && i == values.indexOf(a));
});
charCount.forEach(a => a.forEach(b => count[b] = count[b] ? count[b] + 1 : 1));
count.filter(a => a).reduce((a, b) => a * b)
