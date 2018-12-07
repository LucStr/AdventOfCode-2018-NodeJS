var data = require('./data')(7)

data = data.split('\n').map(a => a.match(/ [A-Z] /g).map(a => a.trim()));
let counts = [];
[].concat(...data).filter((e, i, a) => i == a.indexOf(e)).forEach((e, i, a) => {
    counts.push({
        c: e,
        r: () => data.filter(b => b[1] == e)
    })
});

var result = '';
found = false;
while(counts.filter(a => a).length){
    var next = counts
        .filter(a => !a.r().length)
        .sort((a, b) => b.c > a.c ? -1 : 1)[0];
    delete counts[counts.indexOf(next)]
    result += next.c;
    data.filter(a => a[0] == next.c).forEach(a => {
        delete data[data.indexOf(a)]
    });
}
console.log(result)

/*var hasNext = data.map(a => a[0]).filter((a, i, c) => i == c.indexOf(a));

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
var start = alphabet.filter(a => hasNext.indexOf(a) === -1)[0]
var i = getTail(start, data);
var result = i.split('').filter((a, i, b) => i == b.indexOf(a)).join('')

console.log(result)

function getTail(start, description, cache){
    if(!cache)
        cache = [];
    if(cache[start])
        return cache[start]
    var tail = description.filter(a => a[1] == start).sort().map(a => a[0])
    var i = tail.map(a => {
        var result = getTail(a, description, cache);
        return result
    });
    return i.join('') + start;
}*/