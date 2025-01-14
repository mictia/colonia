const flagsconsole = true;
const flagElse = true;
const event = require('event');
var _ = require('lodash');

module.exports = {
    //Память
    mem: {
        eventTime:[],
        steck:[],
        visual:[],
        Time:{bTime:0,gTime:0},
    },
    //Начало работы
    start: function(cpu){
        flagsconsole?console.log("meneger->start"):0;
        this.mem = Memory.rooms.memory;
        if(!this.mem){
            Memory.rooms = {};
            this.mem = Memory.rooms.memory = {
                eventTime:[],
                steck:['analiticRoom'],
                visual:[],
                Time:{bTime:Game.time,gTime:0},
            };
        }
        if(this.mem.steck[0] !== 'Clouse'){
            this[this.mem.steck[0]]();
        }
        this.rVisual(cpu);
        Memory.rooms.memory = this.mem;
    },
    // Анализ комнаты
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
                if(spawns[0]){
                    this.mem.visual.unshift(name);
                }
                let cool = [];
                for (let i in spawns){
                    cool.push(spawns[i].name);
                }
                Game.rooms[name].memory.spawns = cool;
            }
        }
        this.mem.steck.shift();
        this.mem.steck.push('Clouse');
    },

    // Визуализация
    rVisual: function(cpu){
        flagsconsole?console.log("meneger->rVisual"):0;
        const elepsed = Game.cpu.getUsed() - cpu;
        const room = new RoomVisual(this.mem.visual[0]);
        const startTime = this.mem.Time.bTime; 
        room.rect(0,0,5,5,{fill:'#f00',lineStyle:'dotted'});
        room.text('CPU: '+elepsed,1,1,{stroke:'#00ba1f', align:'left',});
        room.text('Time: '+(Game.time - startTime),1,2,{stroke:'#00ba1f', align:'left',});
        for(let a in this.mem.visual){
            console.log(a);
            room.text(this.mem.visual[a],1,3,{stroke:'#00ba1f', align:'left',});
        }
    }
    
}

//Анализ свободного место вокруг источника
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