const meneger = require('meneger');
const creep = require('creeps');
const spawner = require('structure.spawn');

const flagsconsole = true;
let start = false;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;

    if(start === false){
        meneger.init();
        start = true;
    }
    for(let name in Game.spawns){
        spawner.start(Game.spawns[name]);
    }
    meneger.step();
    meneger.saveMemory();
}