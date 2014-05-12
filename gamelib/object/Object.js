var Class = require('../Class');
var Vector2 = require('../math/Vector2');
var utils = require('../utils');
var Transform = require('../math/Transform');

var defaults = require('../defaults');

var Positionable = Class.extend({
    init: function positionableInit(options) {
        options = defaults(options, {
            position: new Vector2(0, 0),
            rotation: 0
        });

        this.position = options.position;
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
            utils.each(this.children, function(i, ch) {
                if (child === ch) {
                    child.parent = null;
                    self.children.slice(i, 1);
                }
            });
        } else {
            this.delayedRemove.push(child);
        }
    },

    update: function parentUpdate() {
        this._super.apply(this, arguments);

        this.isUpdating = true;

        var args = arguments;
        utils.each(this.children, function(i, child) {
            child.update.apply(child, args);
        });

        this.isUpdating = false;

        var self = this;
        utils.each(this.delayedRemove, function(i, toRemove) {
            self.removeChild(toRemove);
        });
    },

    draw: function parentDraw(transform, debug) {
        transform = transform.transform(this.getLocalTransform());

        utils.each(this.children, function(i, child) {
            child.draw(transform, debug);
        });
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
