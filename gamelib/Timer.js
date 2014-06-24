var Eventer = require('./Eventer');

/**
 * A class for handling timing events. The timer doesn't manually check the
 * time, but is incremented using the `update` interface, the same as the one
 * used by ordinary objects. Uses the Eventer interface, so timers events are
 * received using callbacks from `.on`.
 *
 * @class Timer
 * @extends Eventer
 * @constructor
 * @param [options] Does nothing, passes on to Eventer
 */

var Timer = Eventer.extend({
    init: function timerInit(options) {
        this._super(options);
        
        this.timers = [];
        this.timerId = 0;
    },
    
    /**
     * Adds a timing callback with the specified options. Returns an id which
     * can be used to stop the timer with `stopTimer`.
     *
     * @method addTimer
     * @param {float} timeout The number of seconds before the timer is triggered
     * @param {string} name The name of the event to be triggered when the timer
     * is triggered
     * @param {boolean} repeat Whether the timer should repeat or occur once
     * @param {function} [func] A callback function to automatically added to
     * the event
     * @return {int} An id to be passed to `stopTimer`
     */
    
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
    
    /**
     * Adds a non-repeating timer. Shortcut for `addTimer` with `repeat =
     * false`.
     *
     * @method after
     * @param {float} timeout The number of seconds before the timer is triggered
     * @param {string} name The name of the event to be triggered when the timer
     * is triggered
     * @param {function} [func] A callback function to automatically added to
     * the event
     * @return {int} An id to be passed to `stopTimer`
     */
    
    after: function timerAfter(timeout, name, func) {
        return this.addTimer(timeout, name, false, func);
    },

    /**
     * Adds a repeating timer. Shortcut for `addTimer` with `repeat = true`.
     *
     * @method every
     * @param {float} timeout The number of seconds before the timer is triggered
     * @param {string} name The name of the event to be triggered when the timer
     * is triggered
     * @param {function} [func] A callback function to automatically added to
     * the event
     * @return {int} An id to be passed to `stopTimer`
     */
    
    every: function timerEvery(timeout, name, func) {
        return this.addTimer(timeout, name, true, func);
    },
    
    /**
     * Stops a timer identified by an id.
     *
     * @method stopTimer
     * @param {int} id Id of the timer to stop
     */
    
    stopTimer: function timerStopTimer(id) {
        for (var i = this.timers.length - 1; i >= 0; i--) {
            if (this.timers[i].id === id) {
                this.timers.splice(i, 1);
            }
        }
    },
    
    /**
     * Updates the timer the specified amount of time. Note that the timer
     * doesn't update automatically, and needs to be manually updated to make
     * the timer work. This is useful for something like pausing a game, and
     * making sure that all timers are synchronized. Also note that since the
     * timer is updated in discrete intervals, the events will be triggered at
     * the "end" of the interval that encompasses it, not the middle. This could
     * cause problems if you have intervals that are very small compared to
     * timer timeouts.
     *
     * **Note:** this function probably shouldn't be called manually, and
     * instead should be called either by adding a timer object to the chain of
     * objects, or by using the root timer.
     *
     * @method update
     * @param {float} timeDelta The length of the interval that has passed since
     * the last update.
     */

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
