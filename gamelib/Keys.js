var utils = require('./utils');
var Eventer = require('./Eventer');

var codeToKey = {
    8: ["backspace"],
    9: ["tab"],
    13: ["return", "enter"],
    16: ["shift"],
    17: ["control"],
    18: ["option"],
    27: ["escape"],
    32: ["space"],
    37: ["left"],
    38: ["up"],
    39: ["right"],
    40: ["down"],
    46: ["delete"],
    91: ["command"], 92: ["command"],
    112: ["F1"],
    113: ["F2"],
    114: ["F3"],
    115: ["F4"],
    116: ["F5"],
    117: ["F6"],
    118: ["F7"],
    119: ["F8"],
    120: ["F9"],
    121: ["F10"],
    122: ["F11"],
    123: ["F12"],
    186: [";", "semicolon"],
    187: ["=", "equals"],
    188: [",", "comma"],
    189: ["-", "dash", "minus"],
    190: [".", "period"],
    191: ["/", "slash"],
    192: ["`", "backquote", "backtick"],
    219: ["[", "lbracket", "left-bracket"],
    220: ["\\", "backslash"],
    221: ["]", "rbracket", "right-bracket"],
    222: ["'", "single-quote"]
};

var codeToShiftKey = {
    49: ["!", "exclamation-point"],
    50: ["@", "at-sign"],
    51: ["#", "pound", "number-sign", "octothorpe"],
    52: ["$", "dollar-sign"],
    53: ["%", "percent-sign"],
    54: ["^", "caret", "hat", "uparrow"],
    55: ["&", "ampersand"],
    56: ["*", "star", "asterisk"],
    57: ["(", "open-paren"],
    58: [")", "close-paren"],
    186: [":", "colon"],
    187: ["+", "plus"],
    188: ["<", "less-than", "left-angle", "langle"],
    189: ["_", "underscore"],
    190: [">", "greater-than", "right-angle", "rangle"],
    191: ["?", "question-mark"],
    192: ["~", "tilde", "squiggly"],
    219: ["{", "lbrace", "left-brace"],
    220: ["|", "pipe", "bar"],
    221: ["}", "rbrace", "right-brace"],
    222: ["\"", "quote", "double-quote"]
};

var shiftKey = 16;
var controlKey = 17;

/**
 * Class for interacting with and reading keyboard inputs. Inherits from
 * Eventer, so key inputs are read using events.
 *
 * You can load a control set, which associates keys with specific event names.
 * This could be used for something like a configurable keymap.
 *
 * There are two different kinds of events, key events and control events. Keys
 * are events send by normal keys pressed, and control events are sent when keys
 * in the control set are pressed. Key names are found in this file.
 *
 * Event names:
 * - `key-[key]`: Key events (triggered on press)
 * - `key-[key]-down`: Key events upon press
 * - `key-[key]-up`: Key events upon release
 * - `control-[control]`: Control events (triggered on press)
 * - `control-[control]-down`: Controll events upon press
 * - `control-[control]-up`: Control events upon release
 *
 * If you register an event which consists of a key while shift is being
 * pressed, it will only register while shift is pressed (so `key-colon` will
 * only trigger when shift and semicolon are pressed, while `key-colon` will
 * trigger when semicolon is pressed regardless of the shift key.
 *
 * The data object sent to the event callback has the format:
 *
 *     {
 *         modifiers: {
 *             shift: [true|false]
 *             control: [true|false]
 *         },
 *         keyCode: [int],
 *         name: [string]
 *     }
 *
 * Currently, this class prevents the default actions when keys are pressed.
 * This prevents unintended things (like the page scrolling when space is
 * pressed) but makes it annoying to use sometimes (like using the developer
 * tools or ctrl-L).
 *
 * @class Keys
 * @constructor
 */
var Keys = Eventer.extend({
    init: function keyInit() {
        this._super();

        this._keyMap = {};

        this.controlSet = {};

        /*
         * Note that we listen at the window, so the game itself doesn't need to
         * be selected, which can interfere with other things on the page
         */
        window.addEventListener("keydown", this._onKeyDown.bind(this));
        window.addEventListener("keyup", this._onKeyUp.bind(this)); },

    _onKeyDown: function keysOnKeyDown(event) {
        event.preventDefault();

        var keyCode = event.keyCode;

        if (this._keyMap[keyCode]) {
            return;
        }
        this._keyMap[keyCode] = true;

        this._forEachKey(keyCode, function(key, data) {
            this.trigger("key-" + key + "-down", data);
            this.trigger("key-" + key, data);
        }, function(key, data) {
            this.trigger("control-" + key + "-down", data);
            this.trigger("control-" + key, data);
        });
    },

    _onKeyUp: function keysOnKeyUp(event) {
        event.preventDefault();

        var keyCode = event.keyCode;

        if (!this._keyMap[keyCode]) {
            return;
        }
        this._keyMap[keyCode] = false;

        this._forEachKey(keyCode, function(key, data) {
            this.trigger("key-" + key + "-up", data);
        }, function(key, data) {
            this.trigger("control-" + key + "-up", data);
        });
    },

    _forEachKey: function keysForEachKey(keyCode, keyCallback, controlCallback) {
        var shiftPressed = !!this._keyMap[shiftKey];

        var keys = this._getKeyNames(keyCode, shiftPressed)
        var controls = this._getControlNames(keyCode, shiftPressed);

        var data = {
            modifiers: {
                shift: !!this._keyMap[shiftKey],
                control: !!this._keyMap[controlKey]
            },
            keyCode: keyCode,
            name: keys[0]
        };

        var self = this;
        utils.each(keys, function(i, key) {
            keyCallback.apply(self, [key, data]);
        });

        utils.each(controls, function(i, key) {
            controlCallback.apply(self, [key, data]);
        });
    },

    _getKeyNames: function keysGetKeyNames(keyCode, shiftPressed) {
        var keys = [];

        if (shiftPressed) {
            if (keyCode >= 65 && keyCode <= 90) {
                keys.push(String.fromCharCode(keyCode));
            } else if (codeToShiftKey[keyCode]) {
                keys = keys.concat(codeToShiftKey[keyCode]);
            } else {
                keys = keys.concat(codeToKey[keyCode]);
            }
        }

        if ((keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 65 && keyCode <= 90)) {
            keys.push(String.fromCharCode(keyCode).toLowerCase());
        } else {
            keys = keys.concat(codeToKey[keyCode]);
        }

        return keys;
    },

    _getControlNames: function keysGetControlNames(keyCode, shiftPressed) {
        var keys = this._getKeyNames(keyCode, shiftPressed);
        var controls = [];

        var self = this;
        utils.each(keys, function(i, key) {
            if (self._controlSet[key]) {
                controls.push(self._controlSet[key]);
            }
        });

        return controls;
    },

    /**
     * Set the control set to be used
     *
     * @method setControlSet
     * @param {Object} controlSet Object mapping from key names to control names
     */
    setControlSet: function keysSetControlSet(controlSet) {
        this._controlSet = controlSet;
    }
});

module.exports = Keys;
