//var MN = require('manger');
const mc = require('manger');
const sp = require('rooms');

module.exports.loop = function () {
    console.log("START");
    Game.spawns["Spawn1"].room.memory = {event:""};
    /*
    const sps = new sp.run(Game.spawns);
    for (let name in Game.creeps){
        mc.run(Game.creeps[name]);
    }*/
    console.log("END");
}