
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
    /**
     * @param {StructureSpawn} spawn
     * ['spawnCreep','miner',300]
    */

   run: function(spawn){
    flagsconsole ? console.log('run'):0;
       let room;
       if(this.mem === undefined){
            /**@type {mem} */
            this.mem = new mem(spawn);
            room = {[spawn.room.name]:spawn.name};
        }
        
        const steck = this.mem.getSteckLocal(spawn);
        if(steck === undefined){
            return room;
        }
        console.log(steck);
        let error = FSM.action[steck[0]](spawn,steck[1],steck[2]);
        if(error === 0){
            this.mem.shiftLocal(spawn.name);
        }

        this.mem.saveSteckLocal(spawn);
        return room;
    },
}


/**
 * @constructor
 * @property {Array} this.mem 
 * @property {Array} this.gMem
 * @property {Number} this.count
 * @param {StructureSpawn} spawn
 * @this mem
 * ['spawnCreep','miner',300]
*/
function mem (spawn) {
    flagsconsole ? console.log('constructor mem'):0;
    const steck = spawn.memory.steck;
    if ((steck != undefined)||(steck != null)){
        flagsconsole ? console.log('steck != undefined'):0;
        let name = spawn.name;
        for (let i in spawn.memory){
            this.mem = {[name]:{[i]:spawn.memory[i]}};
        }
        this.gMem = Memory.spawns.globalEvent
        this.count = 0;
    } else {
        flagsconsole ? console.log('steck != undefined else'):0;
        spawn.memory.steck = [[]];
        const gEvent = Memory.spawns.globalEvent;
        if(gEvent === undefined){
            spawn.memory.steck = [['spawnCreep','miner',300]];
            Memory.spawns.globalEvent = [];
            console.log("New memory spawn");
        }
    }
}

mem.prototype.getSteckLocal = function(spawn){
    flagsconsole ? console.log('getSteckLocal '+spawn.name):0;
    console.log(this.mem);
    if (this.mem[spawn.name] === undefined){
        return undefined;
    }
    if(this.mem[spawn.name].steck[0] === undefined){
        return undefined;
    }
    return this.mem[spawn.name].steck[0];
}
mem.prototype.shiftLocal = function(spawn){
    flagsconsole ? console.log('shiftLocal '+spawn.name):0;
    if (this.mem[spawn.name] === undefined){
        return undefined;
    }
    return this.mem[spawn.name].steck.shift();
}
mem.prototype.saveSteckLocal = function(spawn){
    flagsconsole ? console.log('save '+spawn.name):0;
    if (spawn === undefined){
        return undefined;
    }
    spawn.memory = this.mem;
    return true;
}



const FSM = {
    action: {
        /**
         * @param {StructureSpawn} spawn
         * @param {string} type
         * @param {string} position
         */
        spawnCreeps: function(spawn,type,position){
            flagsconsole ? console.log('FSM->action->spawnCreeps'):0;
            const energi = spawn.room.energyAvailable;
            const body = creepBuild[position][type].body;
            const name = creepBuild[position][type].name+Game.time;
            const memory = creepBuild[position][type].mem;
            if(position<=energi){
                const error = spawn.spawnCreep(body,name,memory);
                return error;
            }
            return -6;

        },
    },
    condition: {

    }

}


















/**

    chek_sources: function(spawn,q,w){
        let sources;
        const pos = spawn.pos;
        const sourc = spawn.room.find(FIND_SOURCES_ACTIVE);
        for (let name in sourc){
            let count = 0;
            spawn.room.lookAtArea(pos.y-1,pos.x-1,pos.y+1,pos.x+1).forEach(name=>{
                if(name.type === 'terrain'){
                    
                        if((name.terrain === 'plain')||(name.terrain === 'swamp')){
                            spawn.room.visual.circle(name.x,name.y,{fill: 'transparent', radius: 0.45, stroke: 'green'});
                            count++;
                        } else {
                            spawn.room.visual.circle(name.x,name.y,{fill: 'transparent', radius: 0.45, stroke: 'red'})
                        }

                    }
                });
            sources.push({id: sourc[name].id,miner:0, emptiness:count, distenc:spawn.pos.getRangeTo(sourc[name].room)});
        }

        Memory.rooms.sources = this.sources;
        this.steck = ['spawnCreeps','mainer',0];
        return 0;
    },
    
*/