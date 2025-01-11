const flagsconsole = true;





module.exports = {
    start:function(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        const roomName = {[spawn.name]:spawn.room.name};
        if(spawn.memory === undefined){
            console.log('Error')
        }







        return roomName;
    }


}