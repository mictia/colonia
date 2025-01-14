const flagsconsole = true;
const flagElse = true;




let memorySpawn = {steck:[],getId:'',role:'',energiType:0};

module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function init(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        let mem = spawn.memory;
        if(!mem){
            mem = spawn.memory = {steck:[],getId:'',role:'',energiType:0};
        }
        switch(mem.steck){
            case 'spawn':
                let error = spawn_lvl_creep(spawn, mem.role);
                if(error){mem.steck = '';mem.role = ''}
            break;
        }
        spawn.memory = mem;
        return undefined;
    },


}
/**@param {StructureSpawn} spawn  */
function spawn_lvl_creep(spawn,role){  
    flagsconsole?console.log("structure.spawns=>spawn_lvl_creep"):0;  
    const creepEnergis = creepBuild[role].energi;
    const constBody = creepBuild[role].body;
    const maxEnergi = spawn.room.energyCapacityAvailable;
    const energi = spawn.room.energyAvailable;
    let body = [];
    let s = maxEnergi/creepEnergis;
    s = Math.floor(s);
    if((s*creepEnergis) > energi){
        return false;
    } else {
        for(let i = 0; i < s; i++){
            body = body.concat(constBody);
        }
        spawn.spawnCreep(body, role + Game.time, {memory:{role:role,steck:"",event:[]}});
    }
    
    return false;
}
const creepBuild = {
        mainer: {
            energi:300, 
            body:[WORK,WORK,CARRY,MOVE],
            },
        transport: {
            energi: 150,
            body:[CARRY,MOVE,MOVE]
            },
        build_controller: {
            energi: 300,
            body:[WORK,WORK,CARRY,MOVE],
            },
        builder: {
            energi: 300,
            body:[WORK,WORK,CARRY,MOVE],
            },
}