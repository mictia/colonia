module.exports = {
    /**
     * @param {Creep} creeps
     */
    run: function(creeps){
        //console.log("RUN")
        this.role = creeps.memory.role;
        if ((this.steck = creeps.memory.steck) === undefined){
            this.steck = [this.role];
        }
        this[this.steck[0]]();
    },
    
}











/*
module.exports = {
    man: new manger()
}*/