/*
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * Modified by Emily Eisenberg
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var initializing = false;

/**
 * The base Class implementation (does nothing)
 *
 * @class Class
 * @constructor
 */
var Class = function Class(){};

/**
 * Create a new Class that inherits from this class
 *
 * @method extend
 * @param {Object} prop The methods of the new class
 * @returns {Class} The newly created class
 */
Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] =
            (typeof prop[name] === "function" &&
             typeof _super[name] === "function") ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
    }

    // The dummy class constructor
    function Class() {
        // All construction is actually done in the init method
        if ( !initializing && this.init )
            this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
};

module.exports = Class;
