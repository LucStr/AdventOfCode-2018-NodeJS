const serial = 1309;
const cellSize = 300 + 1;

var fuelcells = new Array(cellSize).fill(0).map(a => new Array(cellSize).fill(0));

for(var x = 1; x < cellSize; x++){
    for(var y = 1; y < cellSize; y++){
        fuelcells[x][y] = getValue(x, y);
    }
}

var max = -Infinity;
var maxx = 0;
var maxy = 0;
var maxSquare = 0;
for(var square = 1; square < cellSize - 1; square++){
    console.log(square);
    for(var x = 1; x < cellSize - square; x++){
        for(var y = 1; y < cellSize - square; y++){
            var value = getSquareValue(x, y, square);
            if(max < value){
                max = value;
                maxx = x;
                maxy = y;
                maxSquare = square;
            }
        }
    }
}

console.log(max, maxx, maxy, maxSquare);

function getSquareValue(x, y, square){
    var value = 0;
    for (let xi = 0; xi < square; xi++) {
        for (let yi = 0; yi < square; yi++) {
            value += fuelcells[x + xi][y + yi];  
        }
    }
    return value;
}

function getValue(x, y){
    var rackId = x + 10;
    return Math.floor((rackId * y + serial) * rackId / 100 % 10) - 5
}