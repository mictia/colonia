exports.manger = {
    /**
     * @param {Creep} creeps
     */
    run(creeps){
        this.role = creeps.memory.role;
        if ((this.steck = creeps.memory.steck) === undefined){
            this.steck = [this.role];
        }
        this[this.steck[0]]();
    },
    harvester(){
        console.log('harvester');
    },
    builder(){

    },
    transport(){

    },
    build_Contr(){

    }

}











/*
module.exports = {
    man: new manger()
}*/