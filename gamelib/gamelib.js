var defaults = require('./defaults');
var GameObject = require('./object/GameObject');
var getTime = require('./time');
var Keys = require('./Keys');
var logger = require('./logger');
var Timer = require('./Timer');
var utils = require('./utils');

/**
 * The main library, provides classes for running games. Also performs setup
 * of the global `g` object.
 *
 * @module gamelib
 */

/**
 * Main class for the game. One of these will be returned to the user when they
 * start a game.
 *
 * @class Game
 * @constructor
 * @param {Canvas} canvas The canvas this game will be drawn in
 * @param {GameObject} [options]
 * @param {String|null} [options.backgroundColor] The CSS color the background
 * will be blanked to before drawing. If set to `null`, the screen will be
 * blanked to white, but it will occur much faster than using `"#fff"`
 */
function Game(canvas, options) {
    options = defaults(options, {
        backgroundColor: null
    });

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");

    this._fpsTimer = getTime();
    this._fpsCounter = 0;
    this._lastTime = getTime();

    this._loopRequestId = null;

    this._backgroundColor = options.backgroundColor;

    /**
     * The main keyboard interface. Keyboard events should be attached to this.
     *
     * @property keys
     * @type Keys
     */

    this.keys = new Keys();

    /**
     * The main timer instance. Other timers can be used, but this provides a
     * global and persistent instance.
     *
     * @property timer
     * @type Timer
     */

    this.timer = new Timer();

    /**
     * The root game object. Objects to be updated and drawn should be added as
     * children to this object. It is a default object, and doesn't do any
     * drawing of its own
     *
     * @property root
     * @type GameObject
     */

    this.root = new GameObject();

    /**
     * The width of the screen.
     *
     * @property screenHeight
     * @type int
     */

    this.screenHeight = this._canvas.height;

    /**
     * The height of the screen.
     *
     * @property screenWidth
     * @type int
     */
    this.screenWidth = this._canvas.width;

    this._justFocused = false;

    /*
     * Listen for focus events on the window. This is used to ignore rAF frames
     * after switching away from tabs and back.
     */
    window.addEventListener("focus", function() {
        this._justFocused = true;
    }.bind(this));
}

/**
 * Starts the game, which mostly entails starting the main loop.
 *
 * @method start
 */

Game.prototype.start = function start() {
    /* Start the first loop */
    this._loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

Game.prototype._loop = function loop(timeNow) {
    this._loopRequestId = null;

    /* Calculate the number of fps over the last second */
    this.fps_counter++;
    if (timeNow - this._fpsTimer > 1000) {
        //logger(this._fpsCounter + " frames per second");
        this._fpsCounter = 0;
        this._fpsTimer += 1000;
    }

    var timeDelta = (timeNow - this._lastTime) / 1000.0;

    if (!this._justFocused) {
        this.root.update(timeDelta);
        this.timer.update(timeDelta);
    } else {
        this._justFocused = false;
    }

    /* Clear the screen */
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (this._backgroundColor === null) {
        /* We use clearRect if possible because it is much faster */
        this._ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    } else {
        this._ctx.fillStyle = this._backgroundColor;
        this._ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    }

    this.root.draw(this._ctx, this.root.getLocalTransform(), false);

    this._lastTime = timeNow;
    /* Start the next loop */
    this._loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

window.gameStop = function gameStop() {
    window.requestAnimationFrame = function() {};
};

window.g = {};

window.g.Class = require('./Class');
window.g.defaults = require('./defaults');
window.g.Eventer = require('./Eventer');
window.g.logger = require('./logger');
window.g.time = require('./time');
window.g.utils = require('./utils');
window.g.Timer = require('./Timer');

window.g.math = {};
window.g.math.Matrix = require('./math/Matrix');
window.g.math.Transform = require('./math/Transform');
window.g.math.Vector2 = require('./math/Vector2');
window.g.math.random = require('./math/random');

window.g.object = {};
window.g.object.GameObject = require('./object/GameObject')
window.g.object.Rectangle = require('./object/Rectangle');
window.g.object.Circle = require('./object/Circle');

module.exports = {
    Game: Game
};
