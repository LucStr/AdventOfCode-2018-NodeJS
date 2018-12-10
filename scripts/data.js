const fs = require('fs');
const path = require('path')
module.exports = function data(day){
    return fs.readFileSync(path.join(__dirname, `./../data/day${day}.in`)).toString();
}