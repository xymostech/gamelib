var defaults = require('./defaults');
var getTime = require('./time');
var logger = require('./logger');
var utils = require('./utils');
var GameObject = require('./object/Object');
var Keys = require('./Keys');
var Timer = require('./Timer');

/**
 * The main library, provides functions for running games 
 *
 * @module gamelib
 */

/**
 * Main class for the game. One of these will be returned to the user when they
 * start a game.
 *
 * @class Game
 * @constructor
 */
function Game(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.options = options;

    this.fpsTimer = getTime();
    this.fpsCounter = 0;
    this.lastTime = getTime();

    this._loopRequestId = null;

    this.keys = new Keys(canvas);
    
    this.mainTimer = new Timer();

    this.root = new GameObject();
    
    this.screenHeight = this.canvas.height;
    this.screenWidth = this.canvas.width;
    
    this._justFocused = false;
    
    var parent = this;
    
    window.addEventListener("focus", function() {
        parent._justFocused = true;
    });
}

Game.prototype.start = function start() {
    this._loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

Game.prototype._loop = function loop(timeNow) {
    this._loopRequestId = null;


    this.fps_counter++;
    if (timeNow - this.fpsTimer > 1000) {
        //logger(this.fpsCounter + " frames per second");
        this.fpsCounter = 0;
        this.fpsTimer += 1000;
    }

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(
        this.options.offsetX,
        this.options.offsetY,
        this.options.screenWidth,
        this.options.screenHeight);

    var timeDelta = (timeNow - this.lastTime) / 1000.0;
    
    if (!this._justFocused) {
        this.root.update(timeDelta);
    } else {
        this._justFocused = false;
    }

    this.root.draw(this.ctx, this.root.getLocalTransform(), false);

    this.lastTime = timeNow;
    this._loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

window.gameStop = function gameStop() {
    window.requestAnimationFrame = function() {};
};

var setup = function gameSetup(canvas, options) {
    options = defaults(options, {
        offsetX: 0,
        offsetY: 0,
        screenHeight: canvas.height,
        screenWidth: canvas.width,
        backgroundColor: "#000"
    });

    return new Game(canvas, options);
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
window.g.object.Object = require('./object/Object')
window.g.object.Rectangle = require('./object/Rectangle');
window.g.object.Circle = require('./object/Circle');

module.exports = {
    setup: setup
};
