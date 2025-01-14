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
 
module.exports = {
    mem: {
        eventTime:[],
        steck:[],
        visual:[],
        sTime:{bTime:0,gTime:0},
    },
    start: function(cpu){
        flagsconsole?console.log("meneger->start"):0;
        this.mem = Memory.rooms.memory;
        if(!this.mem.steck){
            Memory.rooms = {};
            this.mem = Memory.rooms.memory = {
                eventTime:[],
                steck:['analiticRoom'],
                visual:[],
                sTime:{bTime:0,gTime:0},
            };
        }
        this[this.mem.steck[0]]();
        this.RoomVisual(cpu);
    },
    analiticRoom:function(){
        flagsconsole?console.log("meneger->analiticRoom"):0;
        for (let name in Game.rooms){
            if(!Game.rooms[name].memory.sources){
                Game.rooms[name].memory.sources = {};
                let target = Game.rooms[name].find(FIND_SOURCES);
                for(let i in target){
                    let a = crossAnalysisArray(target[i],name)
                    let id = target[i].id;
                    Game.rooms[name].memory.sources[id] = {container:'', worker: a};
                }
                let lvl = Game.rooms[name].controller.level;
                Game.rooms[name].memory.contrLevel = lvl;
                let spawns = Game.rooms[name].find(FIND_MY_SPAWNS);
                if(!spawns[0]){
                    if(spawns[0].my){
                        this.mem.visual.unshift(name);
                    }
                }
                let cool = [];
                for (let i in spawns){
                    cool.push(spawns[i].name);
                }
                Game.rooms[name].memory.spawns = cool;
            }
        }
        this.mem.steck.shift();
        this.mem.steck.push('RoomVisual');
    },
    RoomVisual: function(cpu){
        const elepsed = Game.cpu.getUsed() - cpu;
        for(let a in this.mem.visual){
            const room = new RoomVisual(a);
            room.rect(0,0,10,10,{fill:'#f00',lineStyle:'dashed'});
            room.text('CPU: '+elepsed,1,1,{stroke:'#00ba1f', align:'left',});
            room.text(a,2,1,{stroke:'#00ba1f', align:'left',});
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