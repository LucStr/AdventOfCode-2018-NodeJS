var data = require('./data')(7)

function part1(data){
    data = data.split('\n').map(a => a.match(/ [A-Z] /g).map(a => a.trim()));
    let counts = [];
    [].concat(...data).filter((e, i, a) => i == a.indexOf(e)).forEach((e, i, a) => {
        counts.push({
            c: e,
            r: () => data.filter(b => b[1] == e)
        })
    });
    
    var result = '';
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
    return result;
}

console.log(part1(data));

function part2(data, workers){
    data = data.split('\n').map(a => a.match(/ [A-Z] /g).map(a => a.trim()));
    let counts = [];
    [].concat(...data).filter((e, i, a) => i == a.indexOf(e)).forEach((e, i, a) => {
        counts.push({
            c: e,
            r: () => data.filter(b => b[1] == e),
            t: 60 + e.charCodeAt() - 64
        })
    });
    var stash = [];
    var count = -1;
    var result = '';
    var desired = counts.length;
    while(result.length != desired){
        console.log(stash.map(a => a.c))
        count++;
        let newStash = [];
        stash.forEach(e => {
            if(e.t > 1){
                newStash.push({c: e.c, t: e.t - 1});
            }
            else {
                result += e.c;
                data.filter(a => a[0] == e.c).forEach(a => {
                    delete data[data.indexOf(a)]
                });
            }            
        });
        stash = newStash;
        if(stash.length == workers)
            continue; 
        var candidates = counts
            .filter(a => !a.r().length)
            .sort((a, b) => b.c > a.c ? -1 : 1).slice(0, workers - stash.length);
        candidates.forEach(e => {
            delete counts[counts.indexOf(e)]
            stash.push({
                c: e.c,
                t: e.t
            });
        })
    }
    return count ;
}

console.log(part2(data, 5))