//var MN = require('manger');
//const creepManager = require('./roles/creepManeger');

const SM = require("./spawnManeger");

/**@type {Maneger} */
let maneger = undefined;

module.exports.loop = function () {
    /**
     * Проверка на сбор мусора со стророны сервера
     * при первой интерации производит сбор информации и записывает в память
     * Пока сбор мусора не осуществлиться работа считывание с памяти прекращаеться
     * -- работает со своей внутренней памятью
     * В конце цикла сохраняет в память масивы данных
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
    this.roomSpawn = param;
}
Maneger.prototype.analitic = function(){

}

