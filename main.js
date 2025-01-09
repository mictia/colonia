//var MN = require('manger');
//const creepManager = require('./roles/creepManeger');
let save = require("spawnManeger");

let stateSpawn = undefined;

module.exports.loop = function () {
    
    if(stateSpawn === undefined){
        Game.spawns['Spawn1'].memory = {role:'OLOLO'};
    }
    let r = new save.init();
    r.chek(Game.spawns['Spawn1']);
    console.log(sys = r.getMemorySpawn().spawn1);
    for (let n in sys){
        console.log(n+' '+sys[n]+'count: '+r.count);
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

