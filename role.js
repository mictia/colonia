const flagsconsole = true;
const flagElse = true;
const mainerCreep = require('./role.mainer');

module.exports = {
    /**@param {Creep} creeps  */
    run:function init(creeps){
        flagsconsole?console.log("role=>run"):0;
        let chekRole = {mainer:0,transport:0,build_controller:0,builder:0};
        for (let name in creeps){
            let role = creeps[name].memory.role;
            this[role](creeps[name]);
            chekRole[role] += 1;
        }
        return chekRole;
    },
    mainer: function(creeps){
        flagsconsole?console.log("role=>run=>mainerCreep"):0;
        mainerCreep.run(creeps)
    },
    transport: function(creeps){

    },
    build_controller: function(creeps){

    },
    builder: function(creeps){

    },
}