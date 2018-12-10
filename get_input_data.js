const request = require('request');
const fs = require('fs-extra');
const path = require('path');
var day = process.argv[2];
var { session } = require('./config.json');

if(!day)
    return console.log('please supply a day');

if(!session)
    return sconsole.log('please supply a session-cookie in config.json file');

request(`https://adventofcode.com/2018/day/${day}/input`, {
    headers: {
        'Cookie' : 'session=' + session
    }
}, async (error, response, body) => {
    var p = path.join(__dirname, `./data/day${day}.in`);
    try{
        await fs.ensureFile(p);
        await fs.writeFile(p, body.trim());
    } catch (e){
        if(e){
            return console.log('error:' + e)
        }
    }
    console.log('done!')
})

