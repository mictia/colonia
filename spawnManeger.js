
module.exports = {

    /**
     * @param {StructureSpawn} spawn
     */
    run: function(spawn){
        if(this.mem === undefined){
            this.mem = mem;
            this.mem.chek(spawn);
        }
        console.log(this.mem.getSteck('Spawn1'));
    },
    /**
     * @param {StructureSpawn} spawn
     * @param {string} build
     */
    spawnCreeps: function(spawn,type){
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

/**
 * @this mem
 * @this gMem
*/
const mem = {
    count: undefined,
    /**@param {StructureSpawn} spawn*/
    chek: function(spawn) {
        const steck = spawn.memory.steck;
        if (steck != undefined){
            let name = spawn.name;
            for (let i in spawn.memory){
                this.mem = {[name]:{[i]:spawn.memory[i]}};
            }
            this.gMem = Memory.spawns.globalEvent
            this.count = 0;
            console.log("New memory spawn");
        } else {
            spawn.memory.steck = [];
            const gEvent = Memory.spawns.globalEvent;
            if(gEvent === undefined){
                spawn.memory.steck = [['spawnCreep','miner']];
                Memory.spawns.globalEvent = [];
            }
        }
    },
    getSteck:function(name){
        if (this.mem[name] === undefined){
            return undefined;
        }
        return this.mem[name].steck[0];
    },
    getMemorySpawn:function(){
        return this.spawn;
    },
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