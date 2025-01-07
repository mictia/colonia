//var MN = require('manger');
const mc = require('manger');
const sp = require('spawn');

module.exports.loop = function () {
    console.log("START");
    sp.run(Game.spawn);
    for (let name in Game.creeps){
        mc.run(Game.creeps[name]);
    }
    console.log("END");
}