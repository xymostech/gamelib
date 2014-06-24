var Matrix = require('./Matrix');
var Vector2 = require('./Vector2');

/**
 * Class for handling 2d-transformations. Consists of a translation and
 * rotation.
 *
 * @class Transform
 * @constructor
 * @param {Vector2d} pos The position component of the transform
 * @param {float} angle The angle component of the transform
 */

function Transform(pos, angle) {
    var cos = Math.cos(-angle);
    var sin = Math.sin(-angle);

    this.matrix = new Matrix(3, 3, cos, sin, pos.x, -sin, cos, pos.y, 0, 0, 1);
}

/**
 * Converts a transformation matrix into a Transform
 *
 * @method fromMatrix
 * @static
 * @param {Matrix} matrix The matrix to transform
 * @return {Transform} The created Transform
 */

Transform.fromMatrix = function transformFromMatrix(matrix) {
    var ret = new Transform(0, 0);
    ret.matrix = matrix;
    return ret;
};

/**
 * Rotates a transform a certain amount
 *
 * @method rotate
 * @param {float} angle The angle to rotate by
 * @return {Transform} A new transform, the result of this transform rotated by
 * the given angle
 */

Transform.prototype.rotate = function transformRotate(angle) {
    var cos = Math.cos(-angle);
    var sin = Math.sin(-angle);
    return this.transform(Transform.fromMatrix(
        new Matrix(3, 3, cos, sin, 0, -sin, cos, 0, 0, 0, 1)));
};

/**
 * Translates a transform by a certain amount
 *
 * @method translate
 * @param {Vector2d} pos The amount to translate by
 * @return {Transform} A new transform, the result of this transform translated
 * by the given vector
 */

Transform.prototype.translate = function transformTranslate(pos) {
    return this.transform(Transform.fromMatrix(
        new Matrix(3, 3, 1, 0, pos.x, 0, 1, pos.y, 0, 0, 1)));
};

/**
 * Transforms a transform by another Transform
 *
 * @method transform
 * @param {Transform} trans The Transform to apply to this one
 * @return {Transform} A new transform, the result of this transformed by
 * another transform
 */

Transform.prototype.transform = function transformTransform(trans) {
    return Transform.fromMatrix(this.matrix.mult(trans.matrix));
};

/**
 * Gets the translation component of a transform
 *
 * @method getTranslation
 * @return {Vector2} The translation component of the transform
 */

Transform.prototype.getTranslation = function transformGetTranslation() {
    return new Vector2(this.matrix.mat[0][2], this.matrix.mat[1][2]);
};

/**
 * Gets the rotation component of a transform
 *
 * @method getRotation
 * @return {float} The rotation component of the transform
 */

Transform.prototype.getRotation = function transformGetRotation() {
    return -Math.atan2(this.matrix.mat[0][1], this.matrix.mat[0][0]);
};

/**
 * Creates a human-readable representation of the transform
 *
 * @method toString
 * @return {String} A representation of the transform
 */

Transform.prototype.toString = function transformPrint() {
    var translation = this.getTranslation();
    var angle = this.getRotation();
    return "translation: " + translation.toString() + " angle: " + angle;
};

/**
 * Applies a transformation to a 2d context
 *
 * @method apply
 * @param {CanvasRenderingContext2D} ctx The context to apply to
 */

Transform.prototype.apply = function transformApply(ctx) {
    ctx.setTransform(
        this.matrix.mat[0][0], this.matrix.mat[0][1],
        this.matrix.mat[1][0], this.matrix.mat[1][1],
        this.matrix.mat[0][2], this.matrix.mat[1][2]);
};

module.exports = Transform;
