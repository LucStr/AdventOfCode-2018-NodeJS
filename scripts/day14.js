function train1(scores, cooks, requested){
    while(requested > 0){
        var combinedScore = 0;
        cooks.forEach(e => {
            combinedScore += scores[e];
        });
        if(combinedScore > 9){
            scores.push(Math.floor(combinedScore / 10));
            requested--;
        }
        scores.push(Math.floor(combinedScore % 10));
        requested--;
        cooks.forEach((e, i) => {
            cooks[i] = (e + 1 + scores[e]) % scores.length;
        });
    }
    return {scores, cooks};
}

var a = 260321;
var s = [3, 7];
var c = [0, 1];
var i = a + 10 - s.length;
var r = train1(s, c, i);
var u = r.scores.slice(a, a + 11).reverse();
var result = 0;
var m = 1;
u.forEach(e => {
    result += e * m;
    m *= 10;
});

console.log(r, result);