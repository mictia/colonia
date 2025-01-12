const flagsconsole = true;
const flagElse = true;




let memorySpawn = {steck:'',getId:'',role:'',energiType:0};

module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function init(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        let name = spawn.name;
        if(!init.cache) {
            init.cache = {};
            /**@type {memorySpawn} */
            init.cache[name] = spawn.memory;
            flagElse?console.log("structure.spawns=>start chek !cache "+init.cache[name]):0;
            if(Object.keys(init.cache[name]).length=== 0){
                flagElse?console.log("structure.spawns=>start init spawn memori new"):0;
                init.cache[name] = spawn.memory = memorySpawn;
            }
        };
        
        spawn.memory = init.cache[name];
        return 0;
    },


}