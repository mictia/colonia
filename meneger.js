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

const creepLen = {mainer:0,transport:0,build_controller:0,builder:0};

module.exports = {
    start: function(){
        flagsconsole?console.log("meneger->start"):0;
    },
    /**@param {creepLen} creepCool */
    chekCreep: function(creepCool){
        creepLen = creepCool;
    },
    chekSpaw: function(){

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
                Game.rooms[name].memory.sources = {[id]:{container:'', worker: a}};
            }
        }
        let lvl = Game.rooms[name].controller.level;
        Game.rooms[name].memory.contrLevel = lvl;
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