const flagsconsole = true;
const flagElse = true;




let memorySpawn = {steck:'',getId:'',role:'',energiType:0};

module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function init(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        let mem = spawn.memory;
        if(!mem){
            spawn.memory = {};
            mem = spawn.memory = {steck:'', event:[]};
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
    let energi = spawn.room.energyAvailable;
    let energiCap = spawn.room.energyCapacityAvailable;
    if(spawn.spawning === null){
        for(var i in creepBuild){
            if(Number(i)>= energiCap){
                break;
            }
        }
        if(Number(i)<=energi){
            let error = spawn.spawnCreep(
                creepBuild[i][role].body,
                creepBuild[i][role].name+Game.time%1000,
                creepBuild[i][role].mem,
            );
            if(error === 0 ){return true}
        }
    }
    return false;
}
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