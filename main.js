const meneger = require('meneger');
//const role = require('role');
const spawner = require('structure.spawn');
const flagsconsole = true;
const flagElse = true;
let start = false;
module.exports.loop = function(){
    flagsconsole?console.log("loop"):0;
   // try{
        const cpu = Game.cpu.getUsed();
        let s = 0;
        /*for(let i in Game.spawns){
            spawner.start(Game.spawns[i]);
        }*/
        /*
        role.run(Game.creeps);
        */
        //JSON.stringify()
        meneger.start(cpu);
    //} catch(error){
        console.log('Error: '+ error.stack);
    //}
}