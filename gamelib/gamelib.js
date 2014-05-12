var defaults = require('./defaults');
var getTime = require('./time');
var logger = require('./logger');

window.Class = require('./Class');
window.gameObject = require('./object/Object');

function Game(context, options) {
    this.ctx = context;
    this.options = options;

    this.fps_timer = getTime();
    this.fps_counter = 0;

    this.loopRequestId = null;
}

Game.prototype.start = function start() {
    this.loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

Game.prototype._loop = function loop(timeNow) {
    this.loopRequestId = null;

    this.fps_counter++;
    if (timeNow - this.fps_timer > 1000) {
        logger(this.fps_counter + " frames per second");
        this.fps_counter = 0;
        this.fps_timer += 1000;
    }

    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(
        this.options.offsetX,
        this.options.offsetY,
        this.options.screenWidth,
        this.options.screenHeight);

    this.loopRequestId = window.requestAnimationFrame(
        Game.prototype._loop.bind(this));
};

window.gameStop = function gameStop() {
    window.requestAnimationFrame = function() {};
};

var setup = function(canvas, options) {
    var context = canvas.getContext("2d");

    options = defaults(options, {
        offsetX: 0,
        offsetY: 0,
        screenHeight: canvas.height,
        screenWidth: canvas.width,
        backgroundColor: "#000"
    });

    return new Game(context, options);
};

module.exports = {
    setup: setup
};
