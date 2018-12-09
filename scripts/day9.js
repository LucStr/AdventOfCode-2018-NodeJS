var data = require('./data')(9)

data = data.match(/\d*/g).map(a => Number(a)).filter(a => a)

function splice(playerCount, marbles){
    var players = new Array(playerCount).fill(0)
    var field = [0, 1];
    var current = 1;
    for(var i = 2; i < marbles; i++){
        if(i % 100000 == 0) console.log(marbles - i)
        if(i % 23){
            current = (current + 2) % field.length || field.length;
            if (current > field.length) 
                current -= field.length;
            field.splice(current, 0, i);
        }        
        else{
            current -= 7;
            if (current < 0) 
                current += field.length;
            var u = field.splice(current, 1);     
            players[i % playerCount] += i + Number(u)
        }
    }
    
    var max = 0;
    for(var i in players){
        if(max < players[i])
            max = players[i];
    }
    return max;
}

function linked_list(playerCount, marbles){
    var playerScores = new Array(playerCount).fill(0)
    current = {
        value: 0
    }
    current.next = current;
    current.prev = current;
    for(var i = 1; i < marbles; i++){
        if(i % 23)
            current = addBetween(i, current.next, current.next.next);
        else{
            current = current.prev.prev.prev.prev.prev.prev;
            playerScores[i % playerCount] += i + current.prev.value;
            current.prev.prev.next = current;
            current.prev = current.prev.prev;
        }
    }

    return max(playerScores)

    function addBetween(value, prev, next){
        var newItem = {
            value: value,
            prev: prev,
            next: next
        }
        prev.next = newItem;
        next.prev = newItem;
        return newItem;
    }
}

function max(arr){
    var max = 0;
    for(var i in arr){
        if(max < arr[i])
            max = arr[i];
    }
    return max;
}

console.log(linked_list(data[0], data[1]))
console.log(linked_list(data[0], data[1] * 100))



