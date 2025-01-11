
const flagsconsole = true;
const creepBuild = {
    300: {
        mainer: {
            body:[WORK,WORK,CARRY,MOVE],
            name:'mainer-', 
            mem:{memory:{role:'mainer',steck:"",event:[]}}},
        transport: {
            body:[CARRY,MOVE,MOVE],
            name:'transport-', 
            mem:{memory:{role:'transport',steck:"",event:[]}}},
        build_controller:{
            body:[CARRY,MOVE,MOVE],
            name:'build_controller-', 
            mem:{memory:{role:'build_controller',steck:"",event:[]}}},
        priority:{mainer:1,transport:1, build_controller:0},
    }
}
var _ = require('lodash');

module.exports = {
    init: function(){
        flagsconsole?console.log("meneger init"):0;
        if(Memory.rooms === undefined){
            Memory = {rooms:{}};
        } else {
            if(Memory.rooms.globalEvents === undefined||Memory.rooms.position === undefined||Memory.rooms.sources === undefined){
                Memory.rooms = {globalEvents:[],position:{},sources:{}};
            }
        }
        gEvent = Memory.rooms.globalEvents;
        position = Memory.rooms.position;
        sources = Memory.rooms.sources;
    },
    //{[spawn.name]:spawn.room.name}
    saveRoomSpawn: function(saveRoomSpawn){
        flagsconsole?console.log("meneger->saveRoomSpawn"):0;
        if(saveRoomSpawn != undefined){
            position = saveRoomSpawn;
        }
    },

    step: function(){
        flagsconsole?console.log("meneger->step"):0;

    },

    chekResourcesSpawn: function(){
        flagsconsole?console.log("meneger->chekResourcesSpawn"):0;
        let roomName;
        let spawnName;
        let target;
        for(let name in position){
            let sources_find = [];
            roomName = position[name];
            spawnName = name;
            target = Game.spawns[spawnName].room.find(FIND_SOURCES);
            for(let i in target){
                let pos = Game.spawns[spawnName].pos.getRangeTo(target[i].pos);
                let id = target[i].id;
                let x = target[i].pos.x;
                let y = target[i].pos.y;
                let free = Game.spawns[spawnName].room.lookAtArea(y-1,x-1,y+1,x+1);

                free = _.filter(free,function(chk){
                    console.log(chk.type);
                    if(chk.type === 'terrain'){
                        return chk.terrain === 'plain'||chk.terrain === 'swamp';
                    }
                    return false;
                })
                sources[roomName][id]={dist:pos,free:free.length};
            }
        }
    },
    saveMemory: function(){
        flagsconsole?console.log("meneger->saveMemory globalEvents "+gEvent.length+" position "+position):0;
        Memory.rooms.globalEvents = gEvent;
        Memory.rooms.position = position;
        Memory.rooms.sources = sources;
    }
}

//Memory.rooms = {globalEvents:[],position:{},sources:{}}
let position = {};  
let gEvent = [];
let sources = {}
