window.addEventListener("load", function() {
    var gamelib = window.gamelib;

    var canvas = document.getElementById("game");
    var game = gamelib.setup(canvas);

    window.game = game;

    var Rotater = g.object.Rectangle.extend({
        init: function rotaterInit(options) {
            this._super(options);

            this.rotate = true;
        },

        update: function(timeDelta) {
            this._super(timeDelta);

            if (this.rotate) {
                this.rotation += Math.PI / 2 * timeDelta;
            }
        }
    });

    window.a = new Rotater({
        x: 400, y: 300,
        width: 100, height: 100,
        color: "#f00"
    });

    window.b = new g.object.Circle({
        x: 200, y: 0,
        radius: 50,
        color: "#0f0"
    });

    window.c = new g.object.Rectangle({
        x: 0, y: 200,
        width: 100, height: 100,
        color: "#00f"
    });

    game.root.addChild(window.a);
    window.a.addChild(window.b);
    window.b.addChild(window.c);

    game.keys.setControlSet({
        "a": "hello"
    });

    game.keys.on("key-A", function(data) {
        console.log("Pressed!", data);
    });

    game.keys.on("control-hello", function(data) {
        console.log("Hello!", data);
    });

    game.start();
});
