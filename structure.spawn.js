const flagsconsole = true;





module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;

        const roomName = {spawnName:spawn.name, roomName:spawn.room.name};
        const MemSave = Memory.spawns[spawn.name];
        if( MemSave === undefined){
            flagsconsole?console.log("------Memory.spawn = {"+spawn.name+"}"):0;
            Memory.spawns = {[spawn.name]:save}; 
            return undefined;       
        } else {
            if(memorySpawn[spawn.name] === undefined){
                flagsconsole?console.log("------chek memorySpawn"):0;
    
                memorySpawn.save[spawn.name] = MemSave;
            }
        }
        


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
            flagsconsole?console.log("save "+this.save[spawn.name]):0;
            spawn.memory = this.save[spawn.name];
        } 
    },
}