//var MN = require('manger');
//const creepManager = require('./roles/creepManeger');

const SM = require("./spawnManeger");

/**@type {Maneger} */
let maneger = undefined;

module.exports.loop = function () {

    /**
     * Если сбор мусора со стророны сервера осуществился создаем новый Maneger
     * при первой интерации производит сбор информации и записывает в память обьекта 
     * Пока сбор мусора не осуществлиться работа считывание с памяти прекращаеться
     * -- работает со своей внутренней памятью
     * В конце каждого цикла сохраняет в Memory.room.maneger масивы данных
     */
    if(maneger === undefined){
        maneger = new Maneger();
    }

    //Проходит по спавну и возращает объект принадлежности (название комнаты:имя спавна) 
    for (let name in Game.spawns){
        maneger.entrySpawn(SM.run(Game.spawns[name]));
    }


    /**
     * Выполняет анализ растояния от спавна до рессурсов
     * Анализирует открытую местность вокруг рессурсов
     * Решает сколько нужно создать крипов на том или ином этапе игры
     * Может дать команду глобальный эвент для спавна и крипов
     * Может поставить постройки в любой комнате
     */
    maneger.analitic();
}



/**
 * @constructor
 * @property {Object} this.roomSpawn
 * @property {Object} this.global
 * @this Maneger
 */
function Maneger(){
    this.roomSpawn = {};
    this.globalSpawn = {};
}
/** Сохраняет обьект в память.
 * @function
 * @param {Object} param 
 */
Maneger.prototype.entrySpawn = function (param) {
    if((param === undefined)||(param === null)){
        return;
    }
    this.roomSpawn = param;
}
Maneger.prototype.analitic = function(){

}

