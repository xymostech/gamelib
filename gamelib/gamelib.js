var defaults = require('./defaults');
var getTime = require('./time');
var logger = require('./logger');
var utils = require('./utils');
var GameObject = require('./object/Object');
var Keys = require('./Keys');

function Game(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.options = options;

    this.fpsTimer = getTime();
    this.fpsCounter = 0;
    this.lastTime = getTime();

    this.loopRequestId = null;

    this.keys = new Keys(canvas);

    this.root = new GameObject();
}

Game.prototype.start = function start() {
    this.loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

Game.prototype._loop = function loop(timeNow) {
    this.loopRequestId = null;

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

    this.root.update(timeDelta);
    this.root.draw(this.ctx, this.root.getLocalTransform(), false);

    this.lastTime = timeNow;
    this.loopRequestId = window.requestAnimationFrame(
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

module.exports = {
    setup: setup
};
