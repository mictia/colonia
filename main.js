const meneger = require('meneger');
const creep = require('creeps');
const spawner = require('structure.spawn');

const flagsconsole = true;
let start = false;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;
    
    for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
        var room = Game.rooms[roomName];
        console.log(room);
        console.log(roomName);
        console.log(room.name);
    }
    
    /*
    if(start === false){
        meneger.init();
        start = true;
    }
    for(let name in Game.spawns){
        spawner.start(Game.spawns[name]);
    }
    Game.creep
    meneger.saveMemory();*/
}