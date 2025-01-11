const flagsconsole = true;





module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;

        const roomName = {[spawn.room.name]:spawn.name};
        const MemSave = Memory.spawns[spawn.name];
        if( MemSave === undefined){
            flagsconsole?console.log("------Memory.spawn = {"+spawn.name+"}"):0;
            Memory.spawns = {[spawn.name]:save}; 
            return undefined;       
        }
        if(memorySpawn[spawn.name] === undefined){
            flagsconsole?console.log("------chek memorySpawn"):0;

            memorySpawn[spawn.name] = spawn.memory;
        }

        //code


        memorySpawn.saveMemory(spawn);
        return roomName;
    }


}
const save = {
    steck:'',
    event:[[]],
    worker: false,
    idTarget:'',
}
let memorySpawn = {
    save:{},
    getSteck: function(spawn){
        flagsconsole?console.log("structure.spawns=>getSteck"):0;
    },
    step: function(spawn){
        flagsconsole?console.log("structure.spawns=>step"):0;
    },
    saveMemory: function(spawn){
        flagsconsole?console.log("structure.spawns=>saveMemory"):0;
        if(this.save[spawn.name] != undefined){
            spawn.memory = this.save[spawn.name];
        }
    },
}