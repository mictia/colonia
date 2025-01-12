const meneger = require('meneger');
const role = require('role');
const spawner = require('structure.spawn');
const flagsconsole = true;
const flagElse = true;
let start = false;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;
    
    for(let i in Game.spawns){
        spawner.start(Game.spawns[i]);
    }

    meneger.chekCreep(role.run(Game.creeps));

}