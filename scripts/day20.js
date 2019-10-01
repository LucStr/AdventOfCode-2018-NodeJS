var data = require('./data')(20);

const xStart = 10000;
const yStart = 10000;

const directionSwitch = {
    'N' : 'S',
    'E' : 'W',
    'S' : 'N',
    'W' : 'E'
}

class Map{
    constructor(data){
        this.instructions = data.split('');
        this.instructions.pop();
        this.instructions.shift();
        
        this.map = [];

        this.constructRooms();
    }

    constructRooms(){
        this.start = this.createOrGetTile(xStart, yStart);
        let queue = [this.start];

        this.instructions.forEach(key => {
            let index = queue.length - 1;
            let {x, y} = queue[index];
            let xStart = x;
            let yStart = y;

            switch (key) {
                case 'N':
                    y++;
                    break;
                case 'E':
                    x++;
                    break;
                case 'S':
                    y--;
                    break;
                case 'W':
                    x--;
                    break;
                case '(':
                    queue.push(queue[index]);
                    break;
                case ')':
                    queue.pop();
                    break;
                case '|':
                    queue.pop();
                    index--;
                    queue.push(queue[index])
                    break;
                default:
                    console.error('Couldnt find key ' + key)
            }

            if(x != xStart || y != yStart){
                let newTile = this.createOrGetTile(x, y);
                queue[index].setNeighbour(key, newTile);
                newTile.setNeighbour(directionSwitch[key], queue[index])
                queue[index] = newTile;
            }
        });
    }

    createOrGetTile(x, y){
        let map = this.map;
        if(!map[y])
            map[y] = [];

        if(!map[y][x])
            map[y][x] = new Tile(x, y);
        
        return map[y][x];
    }

    getFarthesRoomFromStart(){
        let queue = this.start.getAllNeighbours();
        let stack = [this.start];
        let iterations = 0;

        while (queue.length) {
            var newQueue = [];
            queue.forEach(element => {
                newQueue.push(...element.getAllNeighbours());
            });
            newQueue = newQueue.filter(a => stack.indexOf(a) === -1);
            stack.push(...queue);
            queue = newQueue;
            iterations++;
        }
        
        return iterations;
    }

    getRoomsFurtherAwayThan(limit){
        let queue = this.start.getAllNeighbours();
        let stack = [this.start];
        let iterations = 0;
        let amount = 0;

        while (queue.length) {
            var newQueue = [];
            queue.forEach(element => {
                newQueue.push(...element.getAllNeighbours());
            });
            newQueue = newQueue.filter(a => stack.indexOf(a) === -1);
            stack.push(...queue);
            iterations++;
            if(iterations >= limit){
                amount += queue.length;
            }
            queue = newQueue;
        }
        
        return amount;
    }
}

class Tile {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.neighbours = {};
    }

    setNeighbour(key, tile){
        this.neighbours[key] = tile;
    }

    getNeighbour(key){
        return this.neighbours[key];
    }

    getAllNeighbours(){
        return Object.values(this.neighbours);
    }
}

var map = new Map(data);
console.log(map.getFarthesRoomFromStart());
console.log(map.getRoomsFurtherAwayThan(1000));