/**
 * A class representing a 2d vector, with common operations
 *
 * @class Vector2
 * @constructor
 * @param {float} x The x component
 * @param {float} y The y component
 */

function Vector2(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Calculates the norm or length of the vector
 *
 * @method norm
 * @return {float} The norm or length of the vector
 */

Vector2.prototype.norm = function vectorNorm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Generates a new vector in the same direction, but of unit length
 *
 * @method normalize
 * @return {Vector2} A normalized version of this vector
 */

Vector2.prototype.normalize = function vectorNormalize() {
    var norm = this.norm();
    return new Vector2(this.x / norm, this.y / norm);
};

/**
 * Adds this vector and another one together
 *
 * @method add
 * @param {Vector2} other The other vector to add to this one
 * @return {Vector2} A new vector, the result of adding this vector to the other
 * one
 */

Vector2.prototype.add = function vectorAdd(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
};

/**
 * Subtracts another vector from this one
 *
 * @method sub
 * @param {Vector2} other The vector to subtract from this one
 * @return {Vector2} A new vector, the result of subtracting the other vector
 * from this one
 */

Vector2.prototype.sub = function vectorSub(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
};

/**
 * Scales this vector by a scalar
 *
 * @method scale
 * @param {float} scale The scalar to scale the vector by
 * @return {Vector2} A new vector, the result of scaling this one by the scalar
 */

Vector2.prototype.scale = function vectorScale(scale) {
    return new Vector2(this.x * scale, this.y * scale);
};

/**
 * Calculates the dot product of this vector and another one
 *
 * @method dot
 * @param {Vector2} other The other vector to dot with this one
 * @return {float} The result of the dot product of this vector and the other
 * one
 */

Vector2.prototype.dot = function vectorDot(other) {
    return this.x * other.x + this.y * other.y;
};

/**
 * Calculates the wedge product of this vector and another one
 *
 * @method wedge
 * @param {Vector2} other The other vector to wedge with this one
 * @return {float} The result of the wedge product of this vector and the other
 */

Vector2.prototype.wedge = function vectorWedge(other) {
    return this.x * other.y - this.y * other.x;
};

/**
 * Generates a string representation of the vector
 *
 * @method toString
 * @return {String} A string representation of the vector
 */

Vector2.prototype.toString = function vectorToString() {
    return "(" + this.x + "," + this.y + ")";
};

module.exports = Vector2;
