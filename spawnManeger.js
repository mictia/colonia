module.exports = {

    init: function(){
        return mem;
    },
    /**
     * @param {StructureSpawn} spawn
     */
    run: function(spawn){
        this.steck = undefined;
        /**@param {Array} steck */
        let steck = spawn.memory.steck;
        if (steck[0][0] === null || steck[0][0] === undefined){
            console.log('Error steck null and undefined');
            return ;
        }
        const code = this[steck[0][0]](spawn, steck[0][1], steck[0][2]);
        /**
         *  0:Запись в конец стека
         * -1:Запись в начало стека
         * -2: загрузка в начало стека вызова действия
         */
        switch(code){
            case 0:
                steck.push(this.steck);
                spawn.memory.steck = steck;
                return ;
            break;
            case -1:
                steck.unshift(this.steck);
                spawn.memory.steck = steck;
            break;
            case -2:
                steck.unshift(this.steck);
                spawn.memory.steck = steck;
            break;
        }
    },
    check: function(spawn){
        const steck = spawn.memory.steck;
        if (steck != undefined){
            return true;
        } else {
            spawn.memory.steck = [];
            const gEvent = Memory.spawns.globalEvent;
            if(gEvent === undefined){
                spawn.memory.steck = [['chek_sources',0,0]];
                Memory.spawns.globalEvent = [];
                return false;
            }
        }
        return false;
    },
    /**
     * @param {StructureSpawn} spawn
     * @param {string} build
     */
    spawnCreeps: function(spawn,type,varible){
        const energiCap = spawn.room.energyCapacityAvailable;
        const energi = spawn.room.energyAvailable;
        let position;
        for (let name in creepBuild){
            if (Number(name)<=energiCap){
                position = Number(name);
            }
        }
        if (position >= energi){
            this.steck = ['setTime', Game.time+10,0];
            return -1;
        }
        const error = spawn.spawnCreep(
            creepBuild[position][type].body,
            creepBuild[position][type].name+Game.time,
            creepBuild[position][type].mem);
        if(error == 0){
            if(type === 'mainer'){
                
            }
        } else {

            return -3;
        }
    },
 
    
    /**
     * @param {StructureSpawn} spawn
     */
    
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
}

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

const mem = {
    count: undefined,
    chek: function(spawn) {
        if(this.count === undefined){
            for (let i in spawn.memory){
                this.spawn.push(spawn.memory[i]);
            }
            this.count = 0;
            console.log("New memory spawn");
        }
    },
    getMemorySpawn(){
        return this.spawn;
    }
}