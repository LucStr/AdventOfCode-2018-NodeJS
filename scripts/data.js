const fs = require('fs');
module.exports = function data(day){
    return fs.readFileSync(__dirname + `./../data/day${day}.in`).toString();
}