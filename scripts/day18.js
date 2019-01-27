let data = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;

data = require('./data')(18);

const OPEN = '.';
const TREE = '|';
const LUMBER = '#';

let field = data.split('\n').map(a => [...a]);
let maxHeight = field.length;
let maxWidth = field[0].length ;

const neighbours = (x, y, field) => {
    return [
        {x: x + 1, y : y},
        {x: x - 1, y : y},
        {x: x, y : y + 1},
        {x: x, y : y - 1},
        {x: x + 1, y : y + 1},
        {x: x - 1, y : y - 1},
        {x: x - 1, y : y + 1},
        {x: x + 1, y : y - 1},
    ]
    .filter(a => a.x < maxWidth && a.x >= 0 && a.y >= 0 && a.y < maxHeight)
    .map(a => field[a.y][a.x]);
}

const matrix = {};
matrix[OPEN] = TREE;
matrix[TREE] = LUMBER;

for(let i = 0; i < 10; i++){
    let initialState = field.map(a => a.slice());
    initialState.forEach((arr, y) => arr.forEach((value, x) => {
        let adj = neighbours(x, y, initialState);
        if(value === LUMBER){
            if(!adj.filter(a => a === LUMBER).length || !adj.filter(a => a === TREE).length){
                field[y][x] = OPEN;
            }
            return;
        }
        if(adj.filter(a => a === matrix[value]).length >= 3){
            field[y][x] = matrix[value];
        }
    }));
}

console.log(field.reduce((a, b) => a.concat(...b), []).filter(a => a === LUMBER).length * field.reduce((a, b) => a.concat(...b), []).filter(a => a === TREE).length)


let cycle = [];
let confirmation = 0;
const minMinutes = 500;

let count = 1;
loop: while(true) {
    let initialState = field.map(a => a.slice());
    initialState.forEach((arr, y) => arr.forEach((value, x) => {
        let adj = neighbours(x, y, initialState);
        if (value === LUMBER) {
            if (!adj.filter(a => a === LUMBER).length || !adj.filter(a => a === TREE).length) {
                field[y][x] = OPEN;
            }
            return;
        }
        if (adj.filter(a => a === matrix[value]).length >= 3) {
            field[y][x] = matrix[value];
        }
    }));
    //console.log(field.map(a => a.join('')).join('\n'));
    if (count >= minMinutes) {
        let value = field.reduce((a, b) => a.concat(...b), []).filter(a => a === LUMBER).length * field.reduce((a, b) => a.concat(...b), []).filter(a => a === TREE).length;
        if(cycle[confirmation] === value){
            confirmation++;
            if(confirmation === cycle.length)
                break loop;
        } else {
            confirmation = 0;
            cycle.push(value);
        }
    }
    count++;
}

console.log(cycle[(1000000000 - minMinutes) % (cycle.length - 1)]);