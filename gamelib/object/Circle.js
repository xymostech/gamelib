var GameObject = require('./GameObject');

/**
 * A class for drawing circles
 *
 * @class Circle
 * @extend GameObject
 * @constructor
 * @param {Object} options Options to use, and pass to the `Object` constructor
 * @param {float} options.radius The radius of the circle
 * @param {String} options.color The color of the circle
 */

var Circle = GameObject.extend({
    init: function(options) {
        this._super(options);

        this.radius = options.radius;
        this.color = options.color;
    },

    /**
     * Draws the circle
     *
     * @method draw
     * @param {CanvasRenderingContext2D} ctx The drawing context
     * @param {Transform} transform The transform this object should be drawn at
     * @param {boolean} debug Whether debug drawing should be turned on or off
     */

    draw: function(ctx, transform, debug) {
        transform = this._super(ctx, transform, debug);

        transform.apply(ctx);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
});

module.exports = Circle;
