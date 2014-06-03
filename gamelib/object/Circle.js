var GameObject = require('./Object');

var Circle = GameObject.extend({
    init: function(options) {
        this._super(options);

        this.radius = options.radius;
        this.color = options.color;
    },

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
