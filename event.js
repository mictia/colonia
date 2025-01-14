
// События
module.exports = {
    creepCount: {
        event:{},
        mainer:0,
        transport:0,
        build_controller:0,
        builder:0
    },

    creepEvent: [],
    menegEvent: [],

    chekCreeps: function(creepCount){
        flagsconsole?console.log("event=>chekCreeps"):0;
        this.creepCount = creepCount;
    },
    chekSpawn: function(chekSpawn){
        flagsconsole?console.log("event=>chekSpawn"):0;
        this.menegEvent = chekSpawn;
    }
}



