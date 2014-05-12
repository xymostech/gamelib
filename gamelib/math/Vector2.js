function Vector2(x, y) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.norm = function vectorNorm() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.normalize = function vectorNormalize() {
    var norm = this.norm();
    return new Vector2(this.x / norm, this.y / norm);
};

Vector2.prototype.add = function vectorAdd(other) {
    return new Vector2(this.x + other.x, this.y + other.y);
};

Vector2.prototype.sub = function vectorSub(other) {
    return new Vector2(this.x - other.x, this.y - other.y);
};

Vector2.prototype.scale = function vectorScale(scale) {
    return new Vector2(this.x * scale, this.y * scale);
};

Vector2.prototype.dot = function vectorDot(other) {
    return this.x * other.x + this.y * other.y;
};

Vector2.prototype.wedge = function vectorWedge(other) {
    return this.x * other.y - this.y * other.x;
};

Vector2.prototype.toString = function vectorToString() {
    return "(" + this.x + "," + this.y + ")";
};

module.exports = Vector2;
