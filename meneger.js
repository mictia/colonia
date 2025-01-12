const flagsconsole = true;
const flagElse = true;
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

let creepLen = {mainer:0,transport:0,build_controller:0,builder:0};
let sourceLen = 0; 
module.exports = {
    start: function(){
        flagsconsole?console.log("meneger->start"):0;
        sourceLen = Memory.rooms.globalSources;
        if(sourceLen === undefined){
            sourceLen = Memory.rooms.globalSources = 0;
        } 
        if(Object.keys(Memory.rooms).length <= 1){
            analiticRoom();
        }

        if(creepLen.mainer < sourceLen){
            spawnCreep(type);
        }
        Memory.rooms.globalSources = sourceLen
    },
    /**@param {creepLen} creepCool */
    chekCreep: function(creepCool){
        creepLen = creepCool;
    }
}

function spawnCreep(type){
    flagsconsole?console.log("meneger->start"):0;
    for(let i in Game.rooms){
        let nameSpawn = Game.rooms[i].memory.spawns;
        for(let s in nameSpawn){
            if(Game.spawns[nameSpawn[s]].memory.steck !== '') {continue};
            Game.spawns[nameSpawn[s]].memory.steck = 'spawn';
            Game.spawns[nameSpawn[s]].memory.role = 'mainer';
        }
    }
}
function analiticRoom(){
    flagsconsole?console.log("meneger->analiticRoom"):0;
    for (let name in Game.rooms){
        if(!Game.rooms[name].memory.sources){
            let target = Game.rooms[name].find(FIND_SOURCES);
            for(let i in target){
                let a = crossAnalysisArray(target[i],name)
                let id = target[i].id;
                Game.rooms[name].memory.sources[id] = {container:'', worker: a};
            }
            let lvl = Game.rooms[name].controller.level;
            Game.rooms[name].memory.contrLevel = lvl;
            let spawns = Game.rooms[name].find(FIND_MY_SPAWNS);
            let cool = [];
            for (let i in spawns){
                cool.push(spawns[i].name);
            }
            Game.rooms[name].memory.spawns = cool;
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

function sourcesFreePlain(){
    let creepLen = 0;
    for(let i in Game.rooms){
        let sourcMem = Game.rooms[i].memory.sources;
        for(let s in sourcMem){
            creepLen+=sourcMem[s].worker;
        }
    }
    return creepLen;
}