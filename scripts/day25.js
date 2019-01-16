var data = require('./data')(25);

var data = data.split('\n').map(a => { 
    let e = {key: a, values: a.split(',').map(Number)};
    e.cluster = [e];
    return e;
});

for(let i = 0; i < data.length - 1; i++){
    loop : for(let j = i + 1; j < data.length; j++){
        var dist = 0;
        for(let k = 0; k < 4; k++){
            dist += Math.abs(data[i].values[k] - data[j].values[k]);
            if(dist > 3)
                continue loop;
        }
        let cluster = [...new Set([...data[i].cluster, ...data[j].cluster])];
        cluster.forEach(c => {
            c.cluster = cluster;
        });
    }
} 
var sizes = [...new Set(data.map(a => a.cluster))].length;
console.log(sizes)