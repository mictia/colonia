const flagsconsole = true;





module.exports = {
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        const roomName = {[spawn.name]:spawn.room.name};
        if(Memory.spawns[spawn.name] === undefined){
            Memory.spawns = {[spawn.name]:{steck:'',event:[[]]}};
        }







        return roomName;
    }


}