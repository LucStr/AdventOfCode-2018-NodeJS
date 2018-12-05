var data = require('./data')(1);

var numbers = data.split('\n').map(a => Number(a));
var result = numbers.reduce((a, b) => a + b);
console.log(result);

var freq = [];
var result = 0;
var found = false;
while(!found){
    for (let i = 0; i < numbers.length; i++) {
        freq.push(result);
        result += numbers[i]
        if(freq.includes(result)){
            found = true;
            break;
        }
    }
}
console.log(result);

