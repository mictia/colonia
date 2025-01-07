//var MN = require('manger');
const mc = require('./manger');

module.exports.loop = function () {
    console.log("START");
    for (let name in Game.creeps){
        mc.run(Game.creeps[name]);
    }
    console.log("END");
}