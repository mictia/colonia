

const mainerCreep = require('./role.mainer');

module.exports = {
    /**@param {Creep} creeps  */
    run:function init(creeps){
        flagsconsole?console.log("role=>run"):0;
        for (let name in creeps){
            let role = creeps[name].memory.role;
            this[role](creeps[name]);
        }
    },
    mainer: function(creeps){
        mainerCreep.run(creeps)
    },
    transport: function(creeps){

    },
    build_controller: function(creeps){

    },
    builder: function(creeps){

    },
}