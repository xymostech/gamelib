/**
 * Class with methods for generating random numbers
 *
 * @class random
 * @static
 */

/**
 * Generates a random number between 0 and 1.
 *
 * @method random
 * @static
 * @return {float} The random number
 */

function random() {
    return Math.random();
}

/**
 * Generates a random float between two values
 *
 * @method randomFloatRange
 * @static
 * @param {float} low Floating point number at the bottom of the range
 * @param {float} high Floating point number at the top of the range
 * @return {float} Returns a floating point number between `low` and `high`
 */

function randomFloatRange(low, high) {
    return random() * (high - low) + low;
}

/**
 * Generates a random integer between (inclusive) two values
 *
 * @method randomIntRange
 * @static
 * @param {int} low Integer at the bottomw of the range
 * @param {int} high Integer at the top of the range
 * @return {int} Returns an integer between `low` and `high` inclusive
 */

function randomIntRange(low, high) {
    return Math.floor(randomFloatRange(low, high + 1));
}

/**
 * Generates a random boolean value
 *
 * @method randomBool
 * @static
 * @returns {boolean} A random boolean value
 */

function randomBool() {
    return random() < 0.5;
}

module.exports = {
    random: random,
    randomFloatRange: randomFloatRange,
    randomIntRange: randomIntRange,
    randomBool: randomBool
};
