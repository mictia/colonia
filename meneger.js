
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
            return;
        }
        for (let i in Memory.rooms){
            if(i === "masiveControle"){
                roomMassiveControle = Memory.rooms[i]
                continue
            }
            position.save[i] = Memory.rooms[i];
        }
    },
    //{spawnName:spawn.name, roomName:spawn.room.name};
    saveMemory: function(){
        flagsconsole?console.log("meneger->saveMemory"):0;
        Memory.rooms = {masiveControle:roomMassiveControle}
        for (let i in position.save){
            Memory.rooms[i]=position.save[i];
        }
    }
}
//interface
const controleRoom ={
        nameSpawn:[],
        nameExitRoom: [],
        sources_id:[],
        steck:'',
}
const sources = {
    id:'',
    cross:0,
}
//massive
const roomMassiveControle = [];

const position = {
    save:{},

}


function chekSpawn(){
    flagsconsole?console.log("meneger->chekResourcesSpawn"):0;
    let spawn = Game.spawns;
    for (let name in spawn){
        let nameRoom = spawn[name].room.name;

        if(nameRoom != _.find(roomMassiveControle,nameRoom)){
            roomMassiveControle.push(nameRoom);
        } else {
            continue;
        }
        if(position.save[roomName].nameSpawn[0] === undefined){
            let date = controleRoom;
            date.nameSpawn.push(name);
            let exitRoom = Game.map.describeExits(nameRoom)
            for(let i in exitRoom){
                date.nameExitRoom.push(exitRoom[i]);
            }
            let target = Game.spawns[name].room.find(FIND_SOURCES);
        
            for(let i in target){
                let s = crossAnalysisArray(target[i],nameRoom);
                date.sources_id.push({id:target[i].id,cross:s});
            }
            position.save[nameRoom] = date;
        }
            

    }
}

function crossAnalysisArray(target,nameRoom){
    const room = new Room(nameRoom);
    let x = target.pos.x;
    let y = target.pos.y;
    let free = room.lookAtArea(y-1,x-1,y+1,x+1,true);

    free = _.filter(free,function(chk){
        if(chk.type === 'terrain'){
            return chk.terrain === 'plain'||chk.terrain === 'swamp';
        }
        return false;
    })
    return free.length
    
}