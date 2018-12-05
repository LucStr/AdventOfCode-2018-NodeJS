var data = require('./data')(5);

var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
var matrix = [];
alphabet.forEach(a => {
    matrix[a] = a.toUpperCase();
    matrix[a.toUpperCase()] = a;
});

function remove_adjacent(text){
    var chars = text.split('');
    var stack = [chars[0]];
    for(var i = 1; i < chars.length; i++){
        if(chars[i] == matrix[stack[stack.length - 1]]){
            stack.pop()
        } else {
            stack.push(chars[i])
        }
    }
    return stack.join('');
}

var i = alphabet.map(a => remove_adjacent(data.split(a).join('').split(a.toUpperCase()).join('')).length).sort((a, b) => a - b);

console.log(remove_adjacent(data).length);
console.log(i[0]);
