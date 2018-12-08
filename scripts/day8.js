var data = require('./data')(8).split(' ').map(a => Number(a))

var index = 0;
var sum = 0;

function loopNode(){
    var child = data[index++]
    var meta = data[index++]
    for(var i = 0; i < child; i++){
        loopNode()
    }
    for(var i = 0; i < meta; i++){
         sum += data[index++]
    }    
}

loopNode();

console.log(sum)

index = 0;
function getNodeValue(){
    var child = data[index++]
    var meta = data[index++]
    if(child == 0){
        var sum = 0;
        for(var i = 0; i < meta; i++){
            sum += data[index++]
        } 
        return sum;
    } else {
        var values = new Array(child).fill(0);
        for(var i = 0; i < child; i++){
            values[i] = getNodeValue()
        }
        var sum = 0;
        for(var i = 0; i < meta; i++){
            var u = data[index++];
            sum += values[u - 1] || 0
        }
        return sum;
    }
}

var result = getNodeValue();
console.log(result);