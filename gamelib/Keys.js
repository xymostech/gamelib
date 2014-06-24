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

var Keys = Eventer.extend({
    init: function keyInit(canvas) {
        this._super();

        this.canvas = canvas;

        this.keyMap = {};

        this.controlSet = {};

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    },

    onKeyDown: function keysOnKeyDown(event) {
        event.preventDefault();

        var keyCode = event.keyCode;

        if (this.keyMap[keyCode]) {
            return;
        }
        this.keyMap[keyCode] = true;

        this.forEachKey(keyCode, function(key, data) {
            this.trigger("key-" + key + "-down", data);
            this.trigger("key-" + key, data);
        }, function(key, data) {
            this.trigger("control-" + key + "-down", data);
            this.trigger("control-" + key, data);
        });
    },

    onKeyUp: function keysOnKeyUp(event) {
        event.preventDefault();

        var keyCode = event.keyCode;

        if (!this.keyMap[keyCode]) {
            return;
        }
        this.keyMap[keyCode] = false;

        this.forEachKey(keyCode, function(key, data) {
            this.trigger("key-" + key + "-up", data);
        }, function(key, data) {
            this.trigger("control-" + key + "-up", data);
        });
    },

    forEachKey: function keysForEachKey(keyCode, keyCallback, controlCallback) {
        var shiftPressed = !!this.keyMap[shiftKey];

        var keys = this.getKeyNames(keyCode, shiftPressed)
        var controls = this.getControlNames(keyCode, shiftPressed);

        var data = {
            modifiers: {
                shift: !!this.keyMap[shiftKey],
                control: !!this.keyMap[controlKey]
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

    getKeyNames: function keysGetKeyNames(keyCode, shiftPressed) {
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

    getControlNames: function keysGetControlNames(keyCode, shiftPressed) {
        var keys = this.getKeyNames(keyCode, shiftPressed);
        var controls = [];

        var self = this;
        utils.each(keys, function(i, key) {
            if (self.controlSet[key]) {
                controls.push(self.controlSet[key]);
            }
        });

        return controls;
    },

    setControlSet: function keysSetControlSet(controlSet) {
        this.controlSet = controlSet;
    }
});

module.exports = Keys;
