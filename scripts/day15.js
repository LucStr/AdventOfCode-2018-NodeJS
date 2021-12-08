let data = require('./data')(15);

function play(elfAttack){
    const field = data.split('\n').map((row, y) => [...row].map((item, x) => {
        let player;
        if(item === 'G' || item === 'E'){
            player = {
                team: item,
                hp: 200,
                attack: item === 'E' ? elfAttack : 3
            };
    
            item = '.'
        };
        
        return {
            x, y, item, player
        };
    })).reduce((a, b) => a.concat(...b));
    
    const elfCount = field.filter(e => e.player && e.player.team == 'E').length;

    const neigborVector = [
        {y: -1, x: 0},
        {y: 0, x: -1},
        {y: 0, x: 1},
        {y: 1, x: 0}
    ];
    
    for(let tile of field){
        if(tile.item != '.'){
            continue;
        }
    
        tile.neighbors = neigborVector.map(({x, y}) => field.find(e => e.x === tile.x + x && e.y === tile.y + y)).filter(e => e && e.item == '.');
    }
    
    let isOver = false;
    let count = -1;
    while(!isOver){
        const players = field.filter(e => e.player);
    
        for(let playerSquare of players){
            if(!playerSquare.player){
                continue;
            }
    
            const possibleTargets = field.filter(e => e.player && e.player.team != playerSquare.player.team).map(e => e.neighbors).reduce((a, b) => a.concat(...b), []);
    
            if(!possibleTargets.length){
                continue;
            }
    
            if(!possibleTargets.includes(playerSquare)){
                const seen = [playerSquare, ...playerSquare.neighbors];
                let current = playerSquare.neighbors.filter(e => !e.player).map(e => [e]);
                while(!possibleTargets.find(e => current.find(f => f.includes(e))) && current.length){
                    const newQueue = [];
        
                    for(let tail of current){
                        const last = tail[tail.length - 1];
        
                        for(let newTile of last.neighbors.filter(e => !e.player && !seen.includes(e))){
                            seen.push(newTile);
                            newQueue.push([...tail, newTile]);
                        }
                    }
        
                    current = newQueue;
                }
    
                let target = current.find(e => possibleTargets.includes(e[e.length - 1]));
    
                if(!target){
                    continue;
                }
    
                target[0].player = playerSquare.player;
                playerSquare.player = undefined;
                playerSquare = target[0];
            }        
    
            if(possibleTargets.includes(playerSquare)){
                let target = playerSquare.neighbors.filter(e => e.player && e.player.team != playerSquare.player.team).sort((a, b) => a.player.hp - b.player.hp)[0];
                
                target.player.hp -= playerSquare.player.attack;
    
                if(target.player.hp <= 0){
                    target.player = undefined;
                }
            }        
        }
    
        isOver = !field.filter(e => e.player && e.player.team === 'G').length || !field.filter(e => e.player && e.player.team === 'E').length
        count++;
    
        /*let out = 'Round ' + count;
    
        for(tile of field){
            if(tile.x === 0){
                out += '\n';
            }
    
            out += tile.player ? tile.player.team : tile.item;
        }
    
        console.log(out);*/
    }
    
    const left = field.filter(e => e.player).map(e => e.player.hp).reduce((a, b) => a + b);

    return {
        noCasualties: elfCount == field.filter(e => e.player && e.player.team == 'E').length,
        score: count * left
    }
}

console.log(play(3).score);

let attack = 3;
let res;
do{
    res = play(attack);
    attack++;
} while(!res.noCasualties)

console.log(res.score);
