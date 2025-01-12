
const flagsconsole = true;
const creepBuild = {
    300: { //lvl 1
        mainer: {
            body:[WORK,WORK,CARRY,MOVE],
            name:'mainer-', 
            mem:{memory:{role:'mainer',steck:"",event:[]}}},
        transport: {
            body:[CARRY,MOVE,MOVE],
            name:'transport-', 
            mem:{memory:{role:'transport',steck:"",event:[]}}},
        build_controller:{
            body:[WORK,WORK,CARRY,MOVE],
            name:'build_controller-', 
            mem:{memory:{role:'build_controller',steck:"",event:[]}}},
        builder: {
            body:[WORK,WORK,CARRY,MOVE],
            name:'builder', 
            mem:{memory:{role:'builder',steck:"",event:[]}}},

    },
    450: {//lvl 2
        mainer: {
            body:[WORK,WORK,WORK,CARRY,MOVE,MOVE], //300 + 150
            name:'mainer-', 
            mem:{memory:{role:'mainer',steck:"",event:[]}}},
        transport: {
            body:[CARRY,MOVE,MOVE,CARRY,MOVE,MOVE,CARRY,MOVE,MOVE],
            name:'transport-', 
            mem:{memory:{role:'transport',steck:"",event:[]}}},
        build_controller:{
            body:[WORK,WORK,WORK,CARRY,CARRY,MOVE],
            name:'build_controller-', 
            mem:{memory:{role:'build_controller',steck:"",event:[]}}},
        builder: {
            body:[WORK,WORK,CARRY,MOVE,MOVE],
            name:'builder', 
            mem:{memory:{role:'builder',steck:"",event:[]}}},
        },
    800: { //lvl 3
        mainer: {
            body:[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], //600 +200
            name:'mainer-', 
            mem:{memory:{role:'mainer',steck:"",event:[]}}},
        transport: {
            body:[CARRY,MOVE,MOVE,CARRY,MOVE,MOVE,CARRY,MOVE,MOVE],
            name:'transport-', 
            mem:{memory:{role:'transport',steck:"",event:[]}}},
        build_controller:{
            body:[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
            name:'build_controller-', 
            mem:{memory:{role:'build_controller',steck:"",event:[]}}},
        builder: {
            body:[WORK,WORK,CARRY,MOVE,MOVE,WORK,WORK,CARRY,MOVE,MOVE],
            name:'builder', 
            mem:{memory:{role:'builder',steck:"",event:[]}}},
        },
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
    },
    step:function(){
        chekSpawn();
    }

}
//interface
const controleRoom ={
        nameSpawn:[],
        coolCreeps:{
            mainer:0,
            transport:0,
            build_controller:0.
        },
        nameExitRoom: [],
        sources_id:[],
        steck:'',
}
const sources = {
    id:'',
    cross:0,
}
//massive
let roomMassiveControle = [];

let position = {
    save:{},

}
function chekCreepMainer(){
    flagsconsole?console.log("meneger->chekCreepMainer"):0;
    let mas = roomMassiveControle;
    for(let i in mas){
        let coolMainer = position.save[i].coolCreeps.mainer;
        let nameSpawn = position.save[i].nameSpawn[0];
        let lvl = Game.spawns[nameSpawn].room.controller.level;
        let Sources = position.save[i].sources_id;
        switch(lvl){
            case 1:
                let num = 0;
                for(let s in Sources){
                    num +=Sources[s].cros;
                }
                if(coolMainer<num){
                    Game.spawns[nameSpawn].memory.event
                }
            break;
        }
    }
}

function chekSpawn(){
    flagsconsole?console.log("meneger->chekResourcesSpawn"):0;
    let spawns = Game.spawns;
    for (let name in spawns){
        let nameRoom = spawns[name].room.name;
        if(nameRoom === roomMassiveControle.find(os=>os===nameRoom)){
            continue;
        } else {
            flagsconsole?console.log("-----add"):0;
            roomMassiveControle.push(nameRoom);
            roomMassiveControle = roomMassiveControle.filter(function(elem,index,arr){
                return arr.indexOf(elem) === index
            });
        }
        if(position.save[nameRoom] === undefined){
            console.log("------meneger->chekResourcesSpawn->create");
            let date = controleRoom;
            date.nameSpawn.push(name);
            let exitRoom = Game.map.describeExits(nameRoom);
            for(let i in exitRoom){
                date.nameExitRoom.push(exitRoom[i]);
            }
            let target = spawns[name].room.find(FIND_SOURCES);
        
            for(let i in target){
                let s = crossAnalysisArray(target[i],nameRoom);
                date.sources_id.push({id:target[i].id,cross:s});
            }
            position.save[nameRoom] = date;
        }
            

    }
}

function crossAnalysisArray(target,nameRoom){
    flagsconsole?console.log("meneger->crossAnalysisArray"):0;
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
function lengthSources(){

}