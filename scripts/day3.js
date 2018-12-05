var data = require('./data')(3);

var field = new Array(3000).fill(0, 0, 3000).map(a => new Array(3000).fill(0, 0, 3000))
data.split('\n').map(a => {
    var match = a.match(/\@ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)/);
    return {
        x: Number(match[1]),
        y: Number(match[2]),
        xlength: Number(match[3]),
        ylength: Number(match[4])
    }
}).forEach(a => {
    for (var i = a.x; i < a.x + a.xlength; i++) {
        for (var j = a.y; j < a.y + a.ylength; j++) {
            field[i][j]++;
        }
    }
})
var result = field.map(a =>
    [0].concat(a.filter(b => b > 1).map(b => b ? 1 : 0)).reduce((c, b) => c + b)
).reduce((a, b) => a + b);

console.log(result);

var field = new Array(3000).fill(0, 0, 3000).map(a => new Array(3000).fill(0, 0, 3000))
data = data.split('\n').map(a => {
        var match = a.match(/\#([0-9]*) \@ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)/);
        return {
            number: Number(match[1]),
            x: Number(match[2]),
            y: Number(match[3]),
            xlength: Number(match[4]),
            ylength: Number(match[5])
        }
    });
data.forEach(a => {
    for (var i = a.x; i < a.x + a.xlength; i++) {
        for (var j = a.y; j < a.y + a.ylength; j++) {
            field[i][j]++;
        }
    }
});

data.forEach(a => {
    for (var i = a.x; i < a.x + a.xlength; i++) {
        for (var j = a.y; j < a.y + a.ylength; j++) {
            if (field[i][j] > 1)
                return;
        }
    }
    result = a.number
})

console.log(result);
