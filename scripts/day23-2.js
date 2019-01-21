var data = `pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`;

data = require('./data')(23)

let areas = data.split('\n').map(a => {
    let pos = a.match(/<(.+)>/)[1].split(',').map(Number);
    let radius = Number(a.match(/r=(\d+)/)[1]);
    let dist1 = pos.map(Math.abs).reduce((a, b) => a + b) - radius;
    let dist2 = pos.map(Math.abs).reduce((a, b) => a + b) + radius;
    return {
        pos: pos,
        radius: radius,
        dist: dist1 < dist2 ? dist1 : dist2,
        overlaps: [],
    }
});

let maxOverlap = [[]]; 
for(var i = 0; i < areas.length; i++){
    !(i % 50) && console.log(i);
    let area = areas[i];
    for(var j = i + 1; j < areas.length; j++){
        if(checkOverlap(area, areas[j])){
            let count = [areas[j], area];
            for(var k in area.overlaps){
                if(areas[k].overlaps[j])
                    count.push(areas[k]);
            }
            area.overlaps[j] = count;
            areas[j].overlaps[i] = count;
            if(maxOverlap[0].length == count.length)
                maxOverlap.push(count);
            if(maxOverlap[0].length < count.length)
                maxOverlap = [count];
        }
    }
}

//Get Value that occurs the most
let values = [];
maxOverlap.map(a => values.push(...(a.map(a => a.dist))));
let counts = values.reduce((a, c) => {
  a[c] = (a[c] || 0) + 1;
  return a;
}, {});
let maxCount = Math.max(...Object.values(counts));
let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);
console.log(Number(mostFrequent[0]))

function checkOverlap(area1, area2){
    let maxDistance = area1.radius + area2.radius - 1;
    let distance = area1.pos.map((a, i) => Math.abs(a - area2.pos[i])).reduce((a, b) => a + b);
    return distance < maxDistance ? 1 : 0;
}