let data = require('./data')(16);

samples = data.split('\n'.repeat(4))[0];

samples = samples.split('\n\n');

const operators = [
    (r, a, b, c) => {r[c] = r[a] + r[b] },
    (r, a, b, c) => {r[c] = r[a] + b },
    (r, a, b, c) => {r[c] = r[a] * r[b] },
    (r, a, b, c) => {r[c] = r[a] * b },
    (r, a, b, c) => {r[c] = r[a] & r[b] },
    (r, a, b, c) => {r[c] = r[a] & b },
    (r, a, b, c) => {r[c] = r[a] | r[b] },
    (r, a, b, c) => {r[c] = r[a] | b },
    (r, a, b, c) => {r[c] = r[a] },
    (r, a, b, c) => {r[c] = a },
    (r, a, b, c) => {r[c] = a > r[b] ? 1 : 0},
    (r, a, b, c) => {r[c] = r[a] > b ? 1 : 0 },
    (r, a, b, c) => {r[c] = r[a] > r[b] ? 1 : 0 },
    (r, a, b, c) => {r[c] = a == r[b] ? 1 : 0},
    (r, a, b, c) => {r[c] = r[a] == b ? 1 : 0 },
    (r, a, b, c) => {r[c] = r[a] == r[b] ? 1 : 0 },
]

let count = samples.filter(sample => {
    let lines = sample.split('\n');
    let before = JSON.parse(lines[0].match(/\[.*\]/));
    let instruction = JSON.parse(`[${lines[1].replace(/ /g, ',')}]`);
    let after = JSON.parse(lines[2].match(/\[.*\]/));
    
    var count = operators
        .map(operator => {
            let result = [...before];
            operator(result, ...instruction.slice(1))
            return result;
        })
        .filter(result => result.every((r, i) => r === after[i]))
    return count.length >= 3
}).length;

console.log(count);

orderedOperators = [];
done = [];

samples.forEach(sample => {
    let lines = sample.split('\n');
    let before = JSON.parse(lines[0].match(/\[.*\]/));
    let instruction = JSON.parse(`[${lines[1].replace(/ /g, ',')}]`);
    let after = JSON.parse(lines[2].match(/\[.*\]/));
    
    var possibilities = operators
        .map((operator, i) => {
            let result = [...before];
            operator(result, ...instruction.slice(1))
            return {index: i, result: result};
        })
        .filter(result => result.result.every((r, i) => r === after[i])).map(a => a.index);
    if(!orderedOperators[instruction[0]]){
        orderedOperators[instruction[0]] = possibilities;
    }
    else if(orderedOperators[instruction[0]].length > 1){
        orderedOperators[instruction[0]] = orderedOperators[instruction[0]].filter(a => possibilities.indexOf(a) !== -1 && !done[a]);
    } else {
        done[orderedOperators[instruction[0]]] = true;
    }
});

orderedOperators = orderedOperators.map(a => operators[a]);

let programms = data.split('\n'.repeat(4))[1].split('\n');
let result = [0, 0, 0, 0];
programms.forEach(programm => {
    let instructions = programm.split(' ').map(Number);
    orderedOperators[instructions[0]](result, ...instructions.slice(1));
});


console.log(result[1])