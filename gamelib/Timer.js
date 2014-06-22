var Eventer = require('./Eventer');

var Timer = Eventer.extend({
    init: function timerInit(options) {
        this._super(options);
        
        this.timers = [];
        this.timerId = 0;
    },
    
    addTimer: function timerAddTimer(timeout, name, repeat, func) {
        var id = this.timerId++;

        this.timers.push({
            id: id,
            time: timeout,
            timeout: timeout,
            name: name,
            repeat: repeat
        });
        
        if (func !== undefined) {
            this.on(name, func);
        }
        
        return id;
    },
    
    after: function timerAfter(timeout, name, func) {
        return this.addTimer(timeout, name, false, func);
    },

    every: function timerEvery(timeout, name, func) {
        return this.addTimer(timeout, name, true, func);
    },
    
    stopTimer: function timerStopTimer(id) {
        for (var i = this.timers.length - 1; i >= 0; i--) {
            if (this.timers[i].id === id) {
                this.timers.splice(i, 1);
            }
        }
    },

    update: function timerUpdate(timeDelta) {
        for (var i = this.timers.length - 1; i >= 0; i--) {
            var timer = this.timers[i];

            timer.time -= timeDelta;

            if (timer.time <= 0) {
                this.trigger(timer.name);
                
                if (timer.repeat) {
                    timer.time = timer.timeout + timer.time;
                } else {
                    this.timers.splice(i, 1);
                }
            }
        }
    }
});

module.exports = Timer;
