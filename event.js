const { set } = require("lodash");


const event = (function(){
        //Подсчет крипов по ролям и запись локального события
            let event ={};
            let mainer=0;
            let transport = 0;
            let build_controller = 0;
            let builder = 0;

            function setCoolCreeps(role){
                switch(role){
                    case 'mainer':mainer++; return true; break;
                    case 'transport':transport++;return true; break;
                    case 'build_controller':build_controller++;return true ;break;
                    case 'builder':builder++;return true;break;
                    default: Console.log('Неизвестная роль'+ role);
                }
                return false;
            };
            function setEventCreeps(role, date){
                const creep = ['mainer', 'transport', 'build_controller', 'builder'];
                if(date === null){
                    return false;
                }
                for(let i in creep){
                    if(creep[i] === role){
                        event[role] = date;
                        return true;
                    };
                };
                return false;
            };
        return {
            setCoolCreeps: setCoolCreeps,
            setEventCreeps: setEventCreeps,
        };
})();

export {event};