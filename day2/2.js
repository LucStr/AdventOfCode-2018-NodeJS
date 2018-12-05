const fs = require('fs');
var data = fs.readFileSync('./day2/input.txt').toString().split('\n');

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