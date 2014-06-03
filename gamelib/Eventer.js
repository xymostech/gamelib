var Class = require('./Class');

var utils = require('./utils');

var Eventer = Class.extend({
    init: function eventerInit(options) {
        this.eventToHandlers = {};
        this.idToHandler = {};
        this.lastHandlerId = 1;
    },

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

    trigger: function eventerTrigger(event, data) {
        if (this.eventToHandlers[event]) {
            utils.each(this.eventToHandlers[event], function(i, handler) {
                handler.callback(data);
            });
        }
    },

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
