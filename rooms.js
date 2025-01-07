module.exports = {
    /**
     * @param {StructureSpawn} spawn
     */
    run: function(spawn){
        this.spawn = spawn;
        console.log('Rooms.run()');
        Memory.rooms ={};
        this.event = Memory.rooms.event;
        if (this.event === undefined || this.event === null){
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
    chek_sources: function(){
        delete Memory.rooms;
        delete Memory.rooms.sources;
        Memory.rooms = {};
        const spawn = this.spawn;
        let arr_spawn = [];
        for (let name in spawn){
            Memory.spawns = {name: {id:spawn[name].id ,x:spawn[name].pos.x, y:spawn[name].pos.y}};
            arr_spawn.unshift(spawn[name]);
        }
        let i = 0;
        let r = 0;
        let name_sources ="";
        const terrain = arr_spawn[0].room.getTerrain();
        const position = [[-1,-1],[-1,0],[-1,1],
                          [0,-1],        [0,1],
                          [1,-1], [1,0], [1,1]];
        const sourc = arr_spawn[0].room.find(FIND_SOURCES_ACTIVE);
        for (let name in sourc){
            name_sources = "sources-"+i;
            
            for (let s = 0; s<position.length; s++){
                r+=getTerr(terrain,sourc[name].pos.x+position[s][0], sourc[name].pos.y+position[s][1]);
            }
            Memory.rooms.sources = {[name_sources]: {id: sourc[name].id,emptiness:r}};
            r = 0;
            i++;
        }
        function getTerr(terrain,x,y){
            switch(terrain.get(x,y)) {
                case TERRAIN_MASK_WALL:
                    return 0
                    break;
                case TERRAIN_MASK_SWAMP:
                    return 1;
                    break;
                case 0:
                    return 1;
                    break;
            }
        }
    },
    timeOut: function(){

    }



}