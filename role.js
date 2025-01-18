const flagsconsole = true;
const flagElse = true;
const mainerCreep = require('./role.mainer');
const event = require('event');

module.exports = {
    /**@param {Creep} creeps  */
    run:function init(creeps){
        flagsconsole?console.log("role=>run"):0;
        // Регистрации количества крипов по ролям
        let creepCount = {event:{},mainer:0,transport:0,build_controller:0,builder:0};
        for (let name in creeps){
            //считывание ролей крипов
            let role = creeps[name].memory.role;
            //Вызов функции по роли *****Дописать передачу события глобального уровня
            this[role](creeps[name]);
            // локальное событие крипов
            creepCount.event[role] = event;
            // Подсчет крипов по ролям
            creepCount[role] += 1;
        }
        
    },
    /**@param {Creep} creeps  */
    mainer: function(creeps){
        flagsconsole?console.log("role=>run=>mainer"):0;
        return mainerCreep.run(creeps)
    },
    /**@param {Creep} creeps  */
    transport: function(creeps){
        flagsconsole?console.log("role=>run=>transport"):0;

    },
    /**@param {Creep} creeps  */
    build_controller: function(creeps){
        flagsconsole?console.log("role=>run=>build_controller"):0;

    },
    /**@param {Creep} creeps  */
    builder: function(creeps){
        flagsconsole?console.log("role=>run=>builder"):0;
    },
}