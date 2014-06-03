var Matrix = require('./Matrix');
var Vector2 = require('./Vector2');

function Transform(pos, angle) {
    var cos = Math.cos(-angle);
    var sin = Math.sin(-angle);

    this.matrix = new Matrix(3, 3, cos, sin, pos.x, -sin, cos, pos.y, 0, 0, 1);
}

Transform.fromMatrix = function transformFromMatrix(matrix) {
    var ret = new Transform(0, 0);
    ret.matrix = matrix;
    return ret;
};

Transform.prototype.rotate = function transformRotate(angle) {
    var cos = Math.cos(-angle);
    var sin = Math.sin(-angle);
    return this.transform(Transform.fromMatrix(
        new Matrix(3, 3, cos, sin, 0, -sin, cos, 0, 0, 0, 1)));
};

Transform.prototype.translate = function transformTranslate(pos) {
    return this.transform(Transform.fromMatrix(
        new Matrix(3, 3, 1, 0, pos.x, 0, 1, pos.y, 0, 0, 1)));
};

Transform.prototype.transform = function transformTransform(trans) {
    return Transform.fromMatrix(this.matrix.mult(trans.matrix));
};

Transform.prototype.getTranslation = function transformGetTranslation() {
    return new Vector2(this.matrix.mat[0][2], this.matrix.mat[1][2]);
};

Transform.prototype.getRotation = function transformGetRotation() {
    return -Math.atan2(this.matrix.mat[0][1], this.matrix.mat[0][0]);
};

Transform.prototype.toString = function transformPrint() {
    var translation = this.getTranslation();
    var angle = this.getRotation();
    return "translation: " + translation.toString() + " angle: " + angle;
};

Transform.prototype.apply = function transformApply(ctx) {
    ctx.setTransform(
        this.matrix.mat[0][0], this.matrix.mat[0][1],
        this.matrix.mat[1][0], this.matrix.mat[1][1],
        this.matrix.mat[0][2], this.matrix.mat[1][2]);
};

module.exports = Transform;
