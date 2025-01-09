//var MN = require('manger');
//const creepManager = require('./roles/creepManeger');
const SM = require("spawnManeger");

let stateSpawn = undefined;

module.exports.loop = function () {
/*
    for (let name in Game.creeps){
        creepManager.run(Game.creeps[name]);
    }
*/

    for (let name in Game.spawns){
        SM.run(Game.spawns[name]);
    }

}

