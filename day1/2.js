const fs = require('fs');
var data = fs.readFileSync('./day1/input.txt').toString();
var freq = [0];
var found = false;
var data = data.split('\n').map(a => Number(a));
var result = 0;
while(!found){
    data.forEach(a => {
        result += a;
        if(freq.includes(result)){
            console.log('found', result);found = true}
        freq.push(result);
    });
}
//console.log(result, freq.includes(result));

