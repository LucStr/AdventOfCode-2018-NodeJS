var data = require('./data')(2).split('\n');

var count = [];
var charCount = data.map(a => {
    var count = [];
    a.split('').forEach(b => count[b] = count[b] ? count[b] + 1 : 1);
    var values = Object.values(count)
    return values.filter((a, i) => a > 1 && i == values.indexOf(a));
});
charCount.forEach(a => a.forEach(b => count[b] = count[b] ? count[b] + 1 : 1));
var result = count.filter(a => a).reduce((a, b) => a * b)
console.log(result);

var result = data.slice(0, data.length - 1).map((a, i) => data.slice(i + 1, data.length).map(b => check(a, b)).filter(c => c)).filter(d => d.length)[0][0];

function check(a, b){
    a = a.split('');
    b = b.split('');
    var errors = 0;
    var result = [];
    for(var i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            errors++;
            if(errors > 1)
                return false;
            continue;
        }
        result.push(a[i]);
    }
    return result.join('');
}

console.log(result);