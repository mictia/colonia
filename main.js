//var MN = require('manger');
//const creepManager = require('./roles/creepManeger');
let save = require("spawnManeger");

let stateSpawn = undefined;
//@ts-check
module.exports.loop = function () {
    
    if(stateSpawn === undefined){
        Game.spawns['Spawn1'].memory = {role:'OLOLO'};
    }
    let r = new save.init();
    r.chek();
    console.log(r.getMemorySpawn());
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

