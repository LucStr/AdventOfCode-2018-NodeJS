const data = require('./data')(10);

var coords = data.split('\n').map(a => {
   var match = a.match(/-?\d+/g).map(a => Number(a))
   return {
       x: match[0],
       y: match[1],
       xvec: match[2],
       yvec: match[3],
       move: function () {
           this.x += this.xvec;
           this.y += this.yvec;
           return this;
       }
   }
});

function getField(coords){
   var miny = Infinity;
   var minx = Infinity;
   var maxy = -Infinity;
   var maxx = -Infinity;
   coords.forEach(c => {
       if(c.x > maxx)
           maxx = c.x;
       if(c.y > maxy)
           maxy = c.y;
       if(c.x < minx)
           minx = c.x;
       if(c.y < miny)
           miny = c.y;
   });
   if(maxy - miny >= 10)
       return false;
   var field = new Array(maxy - miny + 1).fill(0).map(a => new Array(maxx - minx + 1).fill('.'));
   coords.forEach(c => {
       field[c.y - miny][c.x - minx] = '#';
   });
   return field;
}

function printField(coords, p){
   var output = [];
   var field = getField(coords);
   if(field){
    field.forEach(c => {
        output.push(c.reduce((a, b) => a + b));
    });
    console.log(output.join('\n'))
    return true;
   } else {
       return false;
   }   
}

function moveField(coords){
   coords.forEach(c => c.move());
   return printField(coords);
}

var exit = false;
var i = 0;
while(!exit){
    i++;
    exit = moveField(coords);
}
console.log(i);
