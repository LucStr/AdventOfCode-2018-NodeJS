var data = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;

data = require('./data')(17);
const inverter = {
    x: "y",
    y: "x"
}

const CLEAR = '.';
const CLAY = '#';
const FLOWING_WATER = '|';
const STILL_WATER = '~';
const SOURCE_WATER = '+';

let min = {
    x: Infinity,
    y: Infinity
}

let max = {
    x: -Infinity,
    y: -Infinity
}

let clay = data.split('\n').map(a => {
    let numbers = a.match(/\d+/g).map(Number);
    let obj = {};
    let coord = a.slice(0, 1);
    obj[coord] = [numbers.shift()];
    min[coord] = Math.min(min[coord], obj[coord])
    max[coord] = Math.max(max[coord], obj[coord])
    let iCoord = inverter[coord];
    obj[iCoord] = numbers;
    min[iCoord] = Math.min(min[iCoord], ...numbers)
    max[iCoord] = Math.max(max[iCoord], ...numbers)
    return obj;
});

let field = new Array(max.y - min.y + 2).fill(0).map(a => new Array(max.x - min.x + 2).fill(CLEAR));

clay.forEach(row => {
    let yMax = 1 + (row.y.length > 1 ? row.y[1] : row.y[0]);
    let xMax = 1 + (row.x.length > 1 ? row.x[1] : row.x[0]);
    for(let y = row.y[0]; y < yMax; y++){        
        for(let x = row.x[0]; x < xMax; x++){
            field[y - min.y + 1][x - min.x] = CLAY;
        }
    }
});

min.y--;

field[0][500 - min.x] = SOURCE_WATER;

let activeFlows = [{x: 500 - min.x, y: 0}];

while(activeFlows.length){
    let newFlows = [];
    activeFlows.forEach(flow => {
        let yFlow = 1;
        while(flow.y + yFlow <= max.y - min.y && field[flow.y + yFlow][flow.x] === CLEAR){
            field[flow.y + yFlow][flow.x] = FLOWING_WATER;
            yFlow++;
        }
        if(yFlow > 1 && flow.y + yFlow <= max.y - min.y){
            newFlows.push({x: flow.x, y: flow.y + yFlow - 1});
        }
        if(yFlow > 1){            
            return;
        }

        let right_end = getEnd(flow, {x: 1, y : 0});
        let left_end = getEnd(flow, {x: -1, y: 0});

        let ends_right = field[flow.y][flow.x + right_end + 1] === CLAY;
        let ends_left = field[flow.y][flow.x - left_end - 1] === CLAY;

        if(field[flow.y + 1][flow.x + right_end] === CLEAR || field[flow.y + 1][flow.x - left_end] === CLEAR || ((ends_right || ends_left) && !(ends_right && ends_left))){
            for(var x = flow.x - left_end; x <= flow.x + right_end; x++){
                field[flow.y][x] = FLOWING_WATER;
            }
            if(field[flow.y + 1][flow.x + right_end] === CLEAR)
                newFlows.push({x: flow.x + right_end, y : flow.y});
            if(field[flow.y + 1][flow.x - left_end] === CLEAR)
                newFlows.push({x: flow.x - left_end, y : flow.y});
            return;
        }

        if(ends_right && ends_left){
            for(var x = flow.x - left_end; x <= flow.x + right_end; x++){
                field[flow.y][x] = STILL_WATER;
            }
            newFlows.push({x: flow.x, y: flow.y - 1});
        }        
    });
    activeFlows = newFlows;
    //console.log(field.map(a => a.join('')).join('\n'));
}
require('fs').writeFileSync('output.txt', (field.map(a => a.join('')).join('\n')));
//console.log(field.map(a => a.join('')).join('\n'));


function getEnd(flow, direction){
    let count = -1;
    let below;
    let right;
    do
    {
        count++;
        below = field[flow.y + direction.y * count + 1][flow.x + direction.x * count];
        right = field[flow.y + direction.y * count][flow.x + direction.x * (count + 1)];
    } while (below !== CLEAR && below !== FLOWING_WATER && right !== CLAY)
    return count;
}


//console.log(field.map(a => a.join('')).join('\n'));
console.log(field.slice(min.y - 1).map(a => a.filter(b => b === STILL_WATER || b === FLOWING_WATER).length).reduce((a, b) => a + b))
console.log(field.slice(min.y - 1).map(a => a.filter(b => b === STILL_WATER).length).reduce((a, b) => a + b))


//34268
//34281
