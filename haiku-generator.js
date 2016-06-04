console.log("Node starting...");
console.log();

var haiku = require('./haiku');

haiku.createHaiku([[5],[7],[5]]);

console.log();

haiku.createHaiku([[2,1,2],[2,1,1,3],[5]])
console.log();