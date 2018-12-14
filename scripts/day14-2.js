function train(scores, cooks, desired){
    desired = [...desired.toString()].map(Number);
    var achieved = 0;
    var result = false;
    while(!result){
        var combinedScore = 0;
        cooks.forEach(e => {
            combinedScore += scores[e];
        });
        if(combinedScore > 9){
            addScore(Math.floor(combinedScore / 10));            
        }
        addScore(combinedScore % 10); 
        cooks.forEach((e, i) => {
            cooks[i] = (e + 1 + scores[e]) % scores.length;
        });
        
    }

    function addScore(s){
        scores.push(s);
        if(desired[achieved] == s){
            achieved++;
            if(achieved == desired.length){
                result = scores.length - desired.length;
            }
        }            
        else
            achieved = 0;
    }
    return result;
}

var a = 260321;
var s = [3, 7];
var c = [0, 1];
var r = train(s, c, a);

console.log(r);