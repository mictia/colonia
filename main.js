//var MN = require('manger');
const {mc} = require('./manger');

module.exports.loop = function () {

    for (let name in Game.creeps){
        mc.run(Game.creeps[name]);
    }
        
}