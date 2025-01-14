let EventEmitter = {
    creepCount: {
        event:{},
        mainer:0,
        transport:0,
        build_controller:0,
        builder:0
    },
    creepEvent: [],
    menegEvent: [],
    on:function(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    },

    emit:function(eventName, data) {
        const callbacks = this.events[eventName];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    },

    off:function(eventName, callback) {
        const callbacks = this.events[eventName];
        if (callbacks) {
            this.events[eventName] = callbacks.filter(cb => cb !== callback);
        }
    },
}

module.exports = EventEmitter;