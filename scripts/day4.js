var data = require('./data')(4);
var records = [];
var currentRecord;
var years = data
   .split('\n')
   .map(a => {
       var match = a.match(/\[[0-9]*-((.+) ([0-9]{2})\:(.+))\](.+)/);
       return {
           fullDate: new Date(match[1]),
           date: new Date(match[2]),
           hour: Number(match[3]),
           minute: Number(match[4]),
           message: match[5],
       }       
   })
   .filter(a => a.hour == 0 || a.message.includes('#'))
   .sort((a, b) => a.fullDate -  b.fullDate)
   .forEach(a => {
       if(a.message.includes('#')){
           if(currentRecord)
               records.push(currentRecord);
           var guard = Number(a.message.match(/\#([0-9]*)/)[1]);
           var sleeping = new Array(60).fill(0, 0, 60);
           currentRecord = {
               guard,
               sleeping,
           }
           return;
       }
       currentRecord.date = a.date;
       if(a.message.includes('asleep')){
           currentRecord.sleeping[a.minute] = 1;
       } else if(a.message.includes('up')){
           var from = currentRecord.sleeping.lastIndexOf(1);
           currentRecord.sleeping.fill(1, from, a.minute);
       }
   });
records.push(currentRecord);
var guards = records.map(a => a.guard);
guards = records.map(a => a.guard).filter((a, i) => i == guards.indexOf(a));
var collectives = guards.map(a => {
   var shifts = records.filter(r => r.guard == a);
   var collective = shifts.map(a => a.sleeping.reduce((a, b) => a + b)).reduce((a, b) => a + b);
   return {guard: a, average: collective};
}).sort((a, b) => b.average - a.average);
var bestGuardShifts = records.filter(r => r.guard == collectives[0].guard).map(a => a.sleeping);
var sleepByMinutes = new Array(60).fill(0, 0, 60).map((a, i) => {
   return {
       index : i,
       minutes : bestGuardShifts.map(a => a[i]).reduce((a, b) => a + b)
   }
}).sort((a, b) => b.minutes - a.minutes);
console.log(sleepByMinutes[0].index * collectives[0].guard)

var mostSleptMinute = guards.map(a => {
   var shifts = records.filter(r => r.guard == a);
   var mostSlept = new Array(60).fill(0, 0, 60).map((a, i) => {
       var u = shifts.map(a => a.sleeping[i]);
       return {
           index : i,
           minutes : shifts.map(a => a.sleeping[i]).reduce((a, b) => a + b)
       }
   }).sort((a, b) => b.minutes - a.minutes)[0];
   return {
       guard: a,
       minute: mostSlept.index,
       total: mostSlept.minutes,
   }
}).sort((a, b) => b.total - a.total)[0];
console.log(mostSleptMinute.guard * mostSleptMinute.minute)