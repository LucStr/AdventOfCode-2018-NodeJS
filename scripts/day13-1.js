//Disclaimer: x is y and y is x

var data = require('./data')(13);

const Track = function(track){
    this.carts = [];
    this.track = track.split('\n').map(a => a.split(''));
    this.track.forEach((a, x) => {
        a.forEach((b, y) => {
            if(b === '^' || b === 'v'){
                this.carts.push(new Cart(x, y, b, this));
                this.track[x][y] = '|';
            }
            if(b === '<' || b === '>'){
                this.carts.push(new Cart(x, y, b, this));
                this.track[x][y] = '-';
            }
        });
    });
}

Track.prototype.tick = function () {
    var carts = this.carts.sort((a, b) => {
        var diff = a.y - b.y;
        if(diff)
            return diff;
        return a.x - b.x;
    });
    for(var i in carts){
        if(!carts[i].move())
            return carts[i];
    }
    return false;
}

Track.prototype.detectCollision = function() {
    var carts = this.getCarts();
    var c = carts.map(a => a.filter(a => a).length).reduce((a, b) => a + b);
    return c !== this.carts.length;
}

Track.prototype.getCarts = function (){
    var carts = new Array(this.track.length).fill(0).map(a => new Array());
    this.carts.forEach(c => {
        carts[c.x][c.y] = c.icon();
    });
    return carts;
}

Track.prototype.print = function (){
    var carts = this.getCarts();
    var output = '';
    this.track.forEach((a, x) => {
        a.forEach((b, y) => {
            output += carts[x][y] ? carts[x][y] : this.track[x][y];
        });
        output += '\n';
    });
    console.log(output);
}

Track.prototype.getRail = function (x, y){
    return this.track[x][y];
}

const Cart = function (x, y, direction, track){
    var d = {
        '^': 0,
        '>': 1,
        'v': 2,
        '<': 3
    };
	this.x = x;
    this.y = y;
    this.direction = d[direction];
    this.track = track;
    this.turns = 0;
}

Cart.prototype.move = function() {
    var move = [
        () => this.x--,
        () => this.y++,
        () => this.x++,
        () => this.y--,
    ]
    move[this.direction]();  
    var rail = this.track.getRail(this.x, this.y);
    if(rail === '/')
        this.rotate(this.direction % 2 == 0 ? 1 : -1);
    if(rail === '\\')
        this.rotate(this.direction % 2 == 0 ? -1 : 1);
    if(rail === '+'){
        this.rotate(this.turns % 3 - 1);
        this.turns++;
    }    
    if(this.track.carts.filter(a => a.x == this.x && a.y == this.y).length > 1)
        return false;
    return true;
}

Cart.prototype.icon = function (){
    return ['^', '>', 'v', '<'][this.direction];
}

Cart.prototype.rotate = function(amount){
    this.direction += amount;
    if(this.direction < 0)
        this.direction = 4 + this.direction;
    if(this.direction > 3)
        this.direction -= 4;
}

var t = new Track(data);

var i = false;
while(!i){
    i = t.tick();
}
console.log(`${i.y},${i.x}`);