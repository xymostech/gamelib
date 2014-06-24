var GameObject = require('./Object');

var defaults = require('../defaults');

/**
 * A class for drawing rectangles
 *
 * @class Rectangle
 * @extend Object
 * @constructor
 * @param {Object} [options] Options to use, and pass to the `Object` constructor
 * @param {float} [options.width] The width of the rectangle
 * @param {float} [options.height] The height of the rectangle
 * @param {String} [options.color] The color of the rectangle
 */

var Rectangle = GameObject.extend({
    init: function(options) {
        this._super(options);

        options = defaults(options, {
            width: 0,
            height: 0,
            color: "#fff"
        });

        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
    },

    /**
     * Draws the rectangle
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
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
});

module.exports = Rectangle;
