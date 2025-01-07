module.exports = {
    /**
     * @param {StructureSpawn} spawn
     */
    run: function(spawn){
        this.spawn = spawn[0];
        this.event = Memory.rooms.event;
        if (this.event === undefined){
            this.event = ['chek_sources'];
        }
        this[this.event[0]]();
        //this['save']();
    },
    save: function(){
        Memory.rooms.event = this.event;
    },
        /**
     * @param {StructureSpawn} spawn
     */
    chek_sources: function(spawn){
        const sourc = spawn.room.find(FIND_SOURCES_ACTIVE);
        console.log('id '+ sourc[0].id);
        
    },
    timeOut: function(){

    }



}