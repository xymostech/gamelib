var GameObject = require('./Object');

var defaults = require('../defaults');

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

    draw: function(ctx, transform, debug) {
        transform = this._super(ctx, transform, debug);

        transform.apply(ctx);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
});

module.exports = Rectangle;
