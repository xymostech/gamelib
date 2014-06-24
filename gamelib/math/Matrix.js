/**
 * A matrix class with support for basic operations.
 *
 * @class Matrix
 * @constructor
 * @param {int} row The number of rows
 * @param {int} col The number of columns
 */

function Matrix(row, col) {
    this.row = row;
    this.col = col;
    this.mat = Array(row);

    var argIndex = 2;
    for (var i = 0; i < row; i++) {
        this.mat[i] = Array(col);
        for (var j = 0; j < col; j++) {
            this.mat[i][j] = arguments[argIndex];
            argIndex++;
        }
    }
}

/**
 * Add a matrix to another matrix
 *
 * @method add
 * @param {Matrix} other The matrix to add with this one
 * @return {Matrix} A new matrix, which is the sum of this one and the other one
 */

Matrix.prototype.add = function matrixAdd(other) {
    if (this.row !== other.row || this.col !== other.col) {
        throw new Error("Invalid dimensions for matrix addition");
    }

    var ret = new Matrix(this.row, this.col);
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            ret.mat[i][j] = this.mat[i][j] + other.mat[i][j];
        }
    }
    return ret;
};

/**
 * Multiplies two matrices together using standard matrix multiplication
 *
 * @method mult
 * @param {Matrix} other The matrix to multiply with this one
 * @return {Matrix} A new matrix, which is the product of this one and the other
 * one
 */

Matrix.prototype.mult = function matrixMult(other) {
    var row = this.row;
    var col = other.col;
    if (this.col !== other.row) {
        throw new Error("Invalid dimensions for matrix multiplication");
    }
    var n = this.col;

    var ret = new Matrix(row, col);
    for (var i = 0; i < row; i++) {
        for (var j = 0 ; j < col; j++) {
            var sum = 0;
            for (var k = 0; k < n; k++) {
                sum += this.mat[i][k] * other.mat[k][j];
            }
            ret.mat[i][j] = sum;
        }
    }
    return ret;
};

/**
 * Prints out the matrix to the console, for easy debugging
 *
 * @method print
 */

Matrix.prototype.print = function matrixPrint() {
    for (var i = 0; i < this.row; i++) {
        console.log.apply(console, this.mat[i]);
    }
};

module.exports = Matrix;
