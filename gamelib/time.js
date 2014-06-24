/**
 * Class for doing timing related things.
 *
 * @class time
 * @static
 */

/**
 * Gets the time using the highest precision possible.
 *
 * @method getTime
 * @return {float} The current time
 */

function getTime() {
    return (new Date()).getTime();
}

if (window.performance && window.performance.now) {
    getTime = window.performance.now.bind(window.performance);
}

module.exports = getTime;
