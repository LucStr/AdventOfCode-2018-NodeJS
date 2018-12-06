var data = require('./data')(6)


var coords = data.split('\n').map(a => a.split(', ').map(b => Number(b)));
var highestx = coords.sort((a, b) => b[0] - a[0])[0][0] + 1
var highesty = coords.sort((a, b) => b[1] - a[1])[0][1] + 1
var count = [];
var infinite = [];
for(var i = 0; i < highestx; i++){
    for(var j = 0; j < highesty; j++){
        var c = coords.map(a => {return {coord: a, distance: Math.abs(a[0] - i) + Math.abs(a[1] - j)}}).sort((a, b) => a.distance - b.distance);
        if(c[0].distance == c[1].distance){
            continue;
        }
        if(i == 0 || i == highestx - 1)
            infinite.push(c[0].coord)
        if(j == 0 || j == highesty - 1)
            infinite.push(c[0].coord)
        
        
        var coord = c[0].coord;
        count[coord] = count[coord] ? count[coord] + 1 : 1;
    }
}
var infinite = infinite.filter((a, i) => i == infinite.indexOf(a)).map(a => a.toString());

var sortable = []
for(var i in count){
    sortable.push([i, count[i]])
}
var result = sortable.sort((a, b) => b[1] - a[1]).filter(a => !infinite.includes(a[0]))[0][1];

console.log(result);


var count = 0;
for(var i = 0; i < highestx; i++){
    for(var j = 0; j < highesty; j++){
        var c = coords.map(a => Math.abs(a[0] - i) + Math.abs(a[1] - j)).reduce((a, b) => a + b);
        if(c < 10000)
            count++;
    }
}
console.log(count)


