const flagsconsole = true;
const flagElse = true;
const event = require('event');
var _ = require('lodash');



module.exports = {
    //Память
    mem: {
        eventTime:[],
        oppCode:'',
        steck:[],
        visual:[],
        Time:{bTime:0,gTime:0},

    },
    /** Запись в стек исполнения
    * @param {string} code*/
    SetSteck: function(code){
        const arr = Object.keys(oppCode);
        for(let i in arr){
            if(typeof this[arr[i]] === 'function' && arr[i] !== 'OverSteck'){
                this.mem.oppCode = code;
                return true;
            }
        }
        console.log('Данной стековой функции не существует');
        return false;
    },  
    /** Запись в конец стека
    * @param {string} code*/
   PushSteck: function(code){
       const arr = Object.keys(oppCode);
       for(let i in arr){
           if(typeof this[arr[i]] === 'function' && arr[i] !== 'OverSteck'){
               this.mem.steck.push(code);
               return true;
           }
       }
       console.log('Данной стековой функции не существует');
       return false;
   },
    /** Удаление из стека с возращением
    * @param {string} code*/
       ShiftSteck: function(code){
        const arr = Object.keys(oppCode);
        for(let i in arr){
            if(typeof this[arr[i]] === 'function' && arr[i] !== 'OverSteck'){
                return this.mem.steck.shift(code);
            }
        }
        console.log('Данной стековой функции не существует');
        return false;
    },
    /**Начало работы 
     * @param {Number} cpu
    */
    start: function(cpu){
        flagsconsole?console.log("meneger->start"):0;
        this.mem = Memory.rooms.memory.global;
        if(!this.mem.steck){
            Memory.rooms.global = {};
            this.mem = Memory.rooms.memory.global = {
                eventTime:[],
                oppCode:'',
                steck:[['analiticRoom','']],
                visual:[],
                Time:{bTime:Game.time,gTime:0},
            };
        }
        //Пропуск если чист регистр или при *Clouse*
        if(this.mem.steck[0] !== 'Clouse' || this.mem.steck[0] !== ''){
            let s = this.ShiftSteck();
            this.mem.oppCode = s[0];
            
            switch(s.length){
                case 1:
                    oppCode[this.mem.oppCode]();
                break;
                case 2:
                    oppCode[this.mem.oppCode](s[1]);
                break;
                case 3:
                    oppCode[this.mem.oppCode](s[1],s[2]);
                break;
            }
        }
        
        this.rVisual(cpu);
        Memory.rooms.memory = this.mem;
    },


    /**Визуализация
     * Дописать Extension
     * Количество Sources контролироемого комнатой
     * Количество спавнов
     * Юнитов
     * 
     */
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

let oppCode = {
        // Анализ комнаты в случае передачи имени комнаты будет её анализаровать
        analiticRoom:function(nameRoom=undefined){
            flagsconsole?console.log("meneger->analiticRoom"):0;
            if(nameRoom === undefined){
                for (let name in Game.rooms){
                    let room = Game.rooms[name];
                    //проверка на наличие в памяти комнаты и рессурсов
                    if(Object.keys(room.memory).length === 0){
    
                        //поиск источников и перебор
                        let targetSources = room.find(FIND_SOURCES);
                        for(let i in targetSources){
                            //запись источников с количеством свободного места
                             let data = this.searchPlain(targetSources[i],name);
                             room.memory.sources[data.id] = {container:'', worker: data.free};
                        }
                        //запись уровня контроллера
                        let lvl = room.controller.level;
                        room.memory.contrLevel = lvl;
                        //запись спавнов в комнате
                        let spawns = this.searchSpawn(name);
                        if(spawns[0]){
                            //Запись визуализации комнаты там где есть спавны
                            this.mem.visual.unshift(name);
                        }
                        room.spawns = spawns;
                        Game.rooms[name].memory = room.memory;
                    } else {
                        //запись спавнов в комнате
                        let spawns = this.searchSpawn(name);
                        room.spawns = spawns;
                        Game.rooms[name].memory = room.memory;
                        Console.log('Room '+name+' Уже существует!!!');
                    }
                }
            } else {
                let room = Game.rooms[nameRoom];
                //проверка на наличие в памяти комнаты и рессурсов
                if(Object.keys(room.memory).length === 0){
    
                    //поиск источников и перебор
                    let targetSources = room.find(FIND_SOURCES);
                    for(let i in targetSources){
                        //запись источников с количеством свободного места
                         let data = this.searchPlain(targetSources[i],nameRoom);
                         room.memory.sources[data.id] = {container:'', worker: data.free};
                    }
                    //запись уровня контроллера
                    let lvl = room.controller.level;
                    room.memory.contrLevel = lvl;
                    //запись спавнов в комнате
                    let spawns = this.searchSpawn(nameRoom);
                    if(spawns[0]){
                        //Запись визуализации комнаты там где есть спавны
                        this.mem.visual.unshift(nameRoom);
                    }
                    room.spawns = spawns;
                    Game.rooms[nameRoom].memory = room.memory;
                } else {
                    //запись спавнов в комнате
                    let spawns = this.searchSpawn(nameRoom);
                    room.spawns = spawns;
                    Game.rooms[nameRoom].memory = room.memory;
                    Console.log('Room '+nameRoom+' Уже существует!!!');
                }
            }
    
        },
    
        /** Поиск свободного места вокруг target (plain or swamp)-> true;
         * @param {Any} target 
         * @param {String} nameRoom 
         * @returns {Object{id:string,free:number}}
         */
        searchPlain: function(target,nameRoom){
            flagsconsole?console.log("meneger->searchSources"):0;
            const room = new Room(nameRoom);
            let id = target.id;
            let x = target.pos.x;
            let y = target.pos.y;
            let free = room.lookAtArea(y-1,x-1,y+1,x+1,true);
            free = _.filter(free,function(chk){
                if(chk.type === 'terrain'){
                    return chk.terrain === 'plain'||chk.terrain === 'swamp';
                }
                return false;
            })
            return {id:id,free:free.length};
        },
        /** Возращает именна всех spawns в комнате 
         * @param {String} nameRoom 
         * @returns {Array[string]} 
         */
        searchSpawn: function(nameRoom){
            let target = room.find(FIND_MY_SPAWNS);
            const room = new Room(nameRoom);
            let cool = [];
            for (let i in target){
                cool.push(target[i].name);
            }
            return cool;
        },
}

