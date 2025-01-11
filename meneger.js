
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


module.exports = {
    init: function(){
        flagsconsole?console.log("meneger init"):0;
        if(Memory.rooms === undefined){
            Memory = {rooms:{}};
        } else {
            if(Memory.rooms.globalEvents === undefined){
                Memory.rooms = {globalEvents:[]};
            }
            if(Memory.rooms.position === undefined){
                Memory.rooms = {position:[]};
            }
        }
        gEvent = Memory.rooms.globalEvents;
        position = Memory.rooms.position;
    },
    //{[spawn.name]:spawn.room.name}
    saveRoomSpawn: function(saveRoomSpawn){
        flagsconsole?console.log("saveRoomSpawn"):0;
        if(this.position === undefined){
            this.position = [];
        }
        if(saveRoomSpawn != undefined){
            this.position.push(saveRoomSpawn);
            if(position.length <= this.position.length){
                position = this.position;
            }
        }
    },
    saveMemory: function(){
        flagsconsole?console.log("saveMemory "+gEvent+" "+position):0;
        Memory.rooms.globalEvents = gEvent;
        Memory.rooms.position = position
    }
}
let position = [];
let gEvent = [];

