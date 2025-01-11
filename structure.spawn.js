const flagsconsole = true;





module.exports = {
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        const roomName = {[spawn.name]:spawn.room.name};
        if(Memory.spawns[spawn.name] === undefined){
            Memory.spawns = {[spawn.name]:save}
            flagsconsole?console.log("Memory.spawn = {${spawn.name}:${save}}"):0;
        }
        memorySpawn = {[spawn.name]:save};








        return roomName;
    }


}
const save = {
    steck:'',
    event:[[]]
}
let memorySpawn = {
}