var Timer = require('../Timer');
var Transform = require('../math/Transform');
var Vector2 = require('../math/Vector2');

var defaults = require('../defaults');
var utils = require('../utils');

/**
 * An object with support for a local position and translation
 *
 * @class Positionable
 * @extend Timer
 * @constructor
 * @param {Object} [options] Options to be used and passed down to the Timer
 * constructor
 * @param {Vector2} [options.position] The initial position of the object
 * @param {float} [options.rotation] The initial rotation of the object
 */

var Positionable = Timer.extend({
    init: function positionableInit(options) {
        this._super(options);

        options = defaults(options, {
            position: new Vector2(0, 0),
            rotation: 0
        });

        this.position = options.position;
        this.rotation = options.rotation;
    },

    /**
     * Moves this opbject to a given position
     *
     * @method moveTo
     * @param {Vector2} position The new position of the object
     */

    moveTo: function objectMoveTo(position) {
        this.position = position;
    },

    /**
     * Rotates the object to a given rotation
     *
     * @method rotateTo
     * @param {float} rotation The new rotation of the object
     */

    rotateTo: function objectRotateTo(rotation) {
        this.rotation = rotation;
    },

    /**
     * Returns the local transformation of this object
     *
     * @method getLocalTransform
     * @return {Transform} The local transform of this object
     */

    getLocalTransform: function objectGetLocalTransform() {
        return new Transform(this.position, this.rotation);
    },
});

/**
 * A class with an inherent parent-child relationship, which allows for building
 * an object hierarchy. This allows for safe removal of objects from the
 * hierarchy, and passes down draw and update calls to children, so if a root
 * object is drawn or updated, the entire hierarchy will be as well.
 *
 * Using the hierarchy and the individual transforms at each level, a global
 * transform (the combination of transforms from the root to a child) can be
 * calculated.
 *
 * This class currently acts as the base `Object` class.
 *
 * @class Parent
 * @extend Positionable
 * @constructor
 * @param {Object} [options] Options to be passed down to the `Positionable`
 * constructor
 */

var Parent = Positionable.extend({
    init: function parentInit(options) {
        this._super(options);
        this.parent = null;
        this.children = [];

        this.delayedRemove = [];
        this.isUpdating = false;
    },

    /**
     * Adds a child to the current object.
     *
     * **Note:** This method will fail if the child already has a parent.
     *
     * @method addChild
     * @param {Object} child The child to add
     */

    addChild: function objectAddChild(child) {
        if (child.parent !== null) {
            return;
        }

        this.children.push(child);
        child.parent = this;
    },

    /**
     * Removes a child from this object, in an update-safe way. If this object
     * is currently updating, the child will be removed once the update is
     * complete.
     *
     * @method removeChild
     * @param {Object} child The child to remove
     */

    removeChild: function objectRemoveChild(child) {
        if (!this.isUpdating || force) {
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

    /**
     * Updates the object, which updates all of the children
     *
     * @method update
     * @param {float} timeDelta The amount of time that has passed since the
     * last update
     */

    update: function parentUpdate(timeDelta) {
        this._super(timeDelta);

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

    /**
     * Draws the object, which draws all of the children objects.
     *
     * @method draw
     * @param {CanvasRenderingContext2D} ctx The drawing context
     * @param {Transform} transform The transform this object should be drawn at
     * @param {boolean} debug Whether debug drawing should be turned on or off
     * @return {Transform} The transform of this object, after applying its
     * local transform
     *
     * To take advantage of this, subclasses should draw like:
     *
     *     draw: function(ctx, transform, debug) {
     *         transform = this._super(ctx, transform, debug);
     *
     *         transform.apply(ctx);
     *
     *         // Normal drawing here
     *     }
     *
     * See an example in the `Rectangle` class.
     */

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

    /**
     * Gets the global transform of this object, by sequentially applying all of
     * the parent transformations up to the root object.
     *
     * @method getGlobalTransform
     * @return {Transform} The global transform of this object
     */

    getGlobalTransform: function objectGetGlobalTransform() {
        if (this.parent === null) {
            return this.getLocalTransform();
        } else {
            return this.parent.getGlobalTransform().transform(
                this.getLocalTransform());
        }
    }
});

/**
 * The base object class, which is exactly the same as the `Parent` class.
 *
 * @class Object
 * @extend Parent
 * @constructor
 * @param {Object} [options] Options to send to the `Parent` class
 */

var Object = Parent.extend({});

module.exports = Object;
