const flagsconsole = true;
const flagElse = true;




let memorySpawn = {steck:'',getId:'',role:'',energiType:0};

module.exports = {
    /**@param {StructureSpawn} spawn */
    start:function init(spawn){
        flagsconsole?console.log("structure.spawns=>start"):0;
        let name = spawn.name;
        if(!init.cache) {
            flagElse?console.log("structure.spawns=>start chek sereealization "+init.cache):0;
            init.cache = {};
        };
        if(init.cache[name] === null){
            flagElse?console.log("structure.spawns=>start chek cache === null"):0;
            /**@type {memorySpawn} */
            init.cache[name] = spawn.memory;
            if(!init.cache[name]){
                flagElse?console.log("structure.spawns=>start init spawn memori new"):0;
                init.cache[name] = spawn.memory = memorySpawn;
            }
        }
        
        spawn.memory = init.cache[name];
        return 0;
    },


}