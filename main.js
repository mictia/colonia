const meneger = require('meneger');
const creep = require('creeps');
const spawner = require('structure.spawn');

const flagsconsole = true;
let start = undefined;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;

    if(start === undefined){
        start = meneger.init();
    }
    for(let name in Game.spawns){
        meneger.saveRoomSpawn(spawner.start(Game.spawns[name]));
    }


    //meneger.step();
    //meneger.saveMemory();
}