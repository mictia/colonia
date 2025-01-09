//var MN = require('manger');
const creepManager = require('creepManeger');
const spawnManeger = require('spawnManeger');
const { saveSteck } = require('./structure/spawnManeger');

const stateSpawn = undefined;

module.exports.loop = function () {
    if (stateSpawn == undefined){

    }
    /*
    for (let name in Game.creeps){
        creepManager.run(Game.creeps[name]);
    }

    for (let name in Game.spawns){
        
        if (spawnManeger.check(Game.spawns[name])){
            spawnManeger.run(Game.spawns[name]);
        }
    }
        */
}

