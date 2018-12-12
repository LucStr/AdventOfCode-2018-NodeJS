var input = `.###. => #
#.##. => .
.#.## => #
...## => .
###.# => #
##.## => .
..... => .
#..#. => #
..#.. => #
#.### => #
##.#. => .
..#.# => #
#.#.# => #
.##.# => #
.#..# => #
#..## => #
##..# => #
#...# => .
...#. => #
##### => .
###.. => #
#.#.. => .
....# => .
.#### => #
..### => .
..##. => #
.##.. => .
#.... => .
####. => #
.#.#. => .
.#... => #
##... => #`.split('\n');
var patterns = new Array(1000).fill(0);
input.forEach(a => {
    var s = a.split(' => ').map(getPlants).map(getValue);
    patterns[s[0]] = s[1];
})
function getValue(plants){
    return plants.reduce((a, b, i) => a + (b ? Math.pow(2, i + 1) : 0))
}

function getPlants(string){
    return string.split('').map(a => a == '#' ? 1 : 0)
}

var plants = getPlants('##.######...#.##.#...#...##.####..###.#.##.#.##...##..#...##.#..##....##...........#.#.#..###.#');

function generate(plants, patterns, generations, patternSize){
    var offset = (patternSize - 1) / 2; 
    var startIndex = 0;
    for(var g = 0; g < generations; g++){
        if(g % 100000 == 0)
            console.log(g);
        var grown = [];
        for(var i of Array(offset + 1).keys()){
            plants.unshift(0)
            plants.push(0);
        }
        for(var i = offset; i < plants.length - offset; i++){
            grown[i] = patterns[getValue(plants.slice(i - offset, i + offset + 1))];
        }
        var index = grown.indexOf(1) - 1;
        startIndex = index < offset ? startIndex - 1 : index > offset ? startIndex + 1 : startIndex;
        plants = grown.slice(index + 1, grown.lastIndexOf(1) + 1);
    }
    var prod = 0;
    plants.forEach((a, i) => {
        if(a){
            prod += startIndex + i
        }
    })
    return prod;
}
console.log(generate(getPlants('##.######...#.##.#...#...##.####..###.#.##.#.##...##..#...##.#..##....##...........#.#.#..###.#'), patterns, 20, 5));
var first = generate(getPlants('##.######...#.##.#...#...##.####..###.#.##.#.##...##..#...##.#..##....##...........#.#.#..###.#'), patterns, 400, 5);
var second = generate(getPlants('##.######...#.##.#...#...##.####..###.#.##.#.##...##..#...##.#..##....##...........#.#.#..###.#'), patterns, 600, 5);
console.log(second, first, first + (50000000000 - 400) / 200 * (second - first))
