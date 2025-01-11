const meneger = require('meneger');
const creep = require('creeps');
const spawn = require('structure.spawn');
const flagsconsole = true;
const start = undefined;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;
    if(start === undefined){
        start = meneger.init();
    }
    for(let name in Game.spawns){
        spawn.start(Game.spawns[name]);
    }




}