var data = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`

var units = [];
data.split('\n\n').forEach(a => { 
    let s = a.split(':\n'); 
    units.push(...s[1].split('\n').map((a, i) => {
        let stats = a.match(/\d+/g).map(Number);
        let weaknesses = a.match(/weak to ([^\)|;]*)/);
        let immunities = a.match(/immune to ([^\)|;]*)/);
        return {
            team: s[0],
            number: i + 1,
            count: stats[0],
            health: stats[1],
            damage: stats[2],
            initiative: stats[3],
            weaknesses: weaknesses ? weaknesses[1].split(', ') : [],
            immunities: immunities ? immunities[1].split(', ') : [],
            attackType: a.match(/\d* ([^ ]*) damage/)[1],
        }
    }));
});

units.forEach(unit => {
    unit.effectivePower = unit.count * unit.damage;
    unit.targets = units
        .filter(a => a.team != unit.team && !a.immunities.includes(unit.attackType)).map(a => {
            return {
                attacker: unit,
                target: a,
                multiplier: a.weaknesses.includes(unit.attackType) ? 2 : 1,
                damage : function () { 
                    if(this.attacker.effectivePower < 1)
                        return 0;
                    return this.attacker.effectivePower * this.multiplier 
                }
            }
        });
});

while([...new Set(units.filter(a => a.count > 0).map(a => a.team))].length > 1){
    let attacks = [];
    for(let i = 0; i < units.length; i++){
        attacker = units[i];
        let target = attacker.targets.filter(a => a.target.count > 0).sort((a, b) => {
            let damage = b.damage() - a.damage();
            if(damage != 0)
                return damage;
            var power = b.target.effectivePower - a.target.effectivePower;
            if(power != 0)
                return power;
            return b.target.initiative - a.target.initiative;
        })[0];
        if(target){
            console.log(`${target.attacker.team} group ${target.attacker.number} targets defending group ${target.target.number} ${target.damage()} damage`);
            attacks[attacker.initiative] = () => {
                let damage = target.damage();
                let targetUnit = target.target;
                let loss = Math.floor(damage / targetUnit.health);
                console.log(`${target.attacker.team} group ${target.attacker.number} attacks defending group ${targetUnit.number}, killing ${loss} units`);
                targetUnit.count -= loss;
                targetUnit.effectivePower = targetUnit.count * targetUnit.health;
            }            
        }
    }
    attacks = attacks.reverse();
    for(var i in attacks){
        attacks[i]();
    }
}

console.log(units.filter(a => a.count > 0).reduce((a, b) => a + b))

