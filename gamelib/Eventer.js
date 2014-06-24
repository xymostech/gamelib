var Class = require('./Class');

var utils = require('./utils');

/**
 * An extendable class that implements event callbacks. Events can be triggered
 * using `.trigger`, and can be watched for with `.on`. Events are specified
 * with unique strings.
 *
 * @class Eventer
 * @extends Class
 * @constructor
 */

var Eventer = Class.extend({
    init: function eventerInit(options) {
        this.eventToHandlers = {};
        this.idToHandler = {};
        this.lastHandlerId = 0;
    },
    
    /**
     * Add a handler for a specific event in the form of a callback. Returns an
     * id that can be used to remove the handler with `removeHandler`.
     *
     * @method on
     * @param {String} event The event to watch for
     * @param {Function} callback The callback function to be called when the
     * event is triggered. The function should take one argument, `data`, which
     * will receive the data passed in to the corresponding `trigger` call.
     * @return {Int} The id of this callback, used to be removed with
     * `removeHandler`.
     */

    on: function eventerOn(event, callback) {
        var id = this.lastHandlerId;
        this.lastHandlerId++;

        var handler = {
            id: id,
            event: event,
            callback: callback
        };

        if (!this.eventToHandlers[event]) {
            this.eventToHandlers[event] = [];
        }

        this.eventToHandlers[event].push(handler);
        this.idToHandler[id] = handler;

        return id;
    },
    
    /**
     * Trigger a specific event, calling the callbacks for that event with the
     * specified data.
     *
     * @method trigger
     * @param {String} event The event to trigger
     * @param data The data to pass to the callbacks
     */

    trigger: function eventerTrigger(event, data) {
        if (this.eventToHandlers[event]) {
            utils.each(this.eventToHandlers[event], function(i, handler) {
                handler.callback(data);
            });
        }
    },
    
    /**
     * Removes a handler using the id received from `.on`.
     * 
     * @method removeHandler
     * @param {Int} handlerId The handler to remove.
     */

    removeHandler: function eventerRemoveHandler(handlerId) {
        var handler = this.idToHandler[handlerId];
        if (handler) {
            var j = null;
            utils.each(this.eventToHandlers[handler.event], function(i, h) {
                if (h === handler) {
                    j = i;
                }
            });
            this.eventToHandlers[handler.event].splice(j, 1);
        }
    }
});

module.exports = Eventer;
