var Eventer = require('../Eventer');
var Transform = require('../math/Transform');
var Vector2 = require('../math/Vector2');

var defaults = require('../defaults');
var utils = require('../utils');

var Positionable = Eventer.extend({
    init: function positionableInit(options) {
        options = defaults(options, {
            position: new Vector2(0, 0),
            rotation: 0
        });

        if (options.x || options.y) {
            this.position = new Vector2(options.x || 0, options.y || 0);
        } else {
            this.position = options.position;
        }

        this.rotation = options.rotation;
    },

    moveTo: function objectMoveTo(position) {
        this.position = position;
    },

    rotateTo: function objectRotateTo(rotation) {
        this.rotation = rotation;
    },

    getLocalTransform: function objectGetLocalTransform() {
        return new Transform(this.position, this.rotation);
    },

    update: function positionableUpdate() {},

    draw: function positionableDraw() {}
});

var Parent = Positionable.extend({
    init: function parentInit(options) {
        this._super(options);
        this.parent = null;
        this.children = [];

        this.delayedRemove = [];
        this.isUpdating = false;
    },

    addChild: function objectAddChild(child) {
        if (child.parent !== null) {
            return;
        }

        this.children.push(child);
        child.parent = this;
    },

    removeChild: function objectRemoveChild(child, force) {
        if (!this.isUpdating) {
            var self = this;
            utils.each(this.children, function eachChild(i, ch) {
                if (child === ch) {
                    child.parent = null;
                    self.children.splice(i, 1);
                    return false;
                }
            });
        } else {
            this.delayedRemove.push(child);
        }
    },

    update: function parentUpdate(timeDelta) {
        this._super(timeDelta)

        this.isUpdating = true;

        utils.each(this.children, function updateEachChild(i, child) {
            child.update(timeDelta);
        });

        this.isUpdating = false;

        var self = this;
        utils.each(this.delayedRemove, function removeChildren(i, toRemove) {
            self.removeChild(toRemove);
        });
        this.delayedRemove = [];
    },

    draw: function parentDraw(ctx, transform, debug) {
        var childTransform = transform.transform(this.getLocalTransform());

        utils.each(this.children, function drawEachChild(i, child) {
            child.draw(ctx, childTransform, debug);
        });

        var myTransform = new Transform(
            childTransform.getTranslation(),
            -childTransform.getRotation());

        return myTransform;
    },

    getGlobalTransform: function objectGetGlobalTransform() {
        if (this.parent === null) {
            return this.getLocalTransform();
        } else {
            return this.parent.getGlobalTransform().transform(
                this.getLocalTransform());
        }
    }
});

module.exports = Parent;
