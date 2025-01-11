const flagsconsole = true;





module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        const roomName = {[spawn.name]:spawn.room.name};
        if(Memory.spawns[spawn.name] === undefined){
            flagsconsole?console.log("Memory.spawn = {"+spawn.name+":"+save.steck+","+save.event+"}"):0;
            Memory.spawns = {[spawn.name]:save}
        }
        if(memorySpawn[spawn.name] === undefined){
            flagsconsole?console.log("chek memorySpawn"):0;
            let timeSave = save;
            timeSave.steck = spawn.memory.steck;
            timeSave.event = spawn.memory.event;
            memorySpawn = {[spawn.name]:timeSave};
        }


        memorySpawn.saveMemory(spawn);
        return roomName;
    }


}
const save = {
    steck:'',
    event:[[]]
}
let memorySpawn = {
    getSteck: function(spawn){
        flagsconsole?console.log("structure.spawns=>getSteck"):0;
    },
    step: function(spawn){
        flagsconsole?console.log("structure.spawns=>step"):0;
    },
    saveMemory: function(spawn){
        flagsconsole?console.log("structure.spawns=>saveMemory"):0;
        spawn.memory = this[spawn.name];
    },
}