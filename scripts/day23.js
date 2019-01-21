data = require('./data')(23);
/*data = `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`*/

data = data.split('\n').map(a => {
    let pos = a.match(/<(.+)>/)[1].split(',').map(Number);
    return {
        pos: pos,
        radius: Number(a.match(/r=(\d+)/)[1])
    }
});

let strongest = data.sort((a, b) => b.radius - a.radius)[0];

let count = data.filter(a => {
    let distance = a.pos.map((a, i) => Math.abs(strongest.pos[i] - a)).reduce((a, b) => a + b);
    return distance <= strongest.radius;
}).length;

console.log(count);


