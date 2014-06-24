/**
 * Utility class, contains static utility methods.
 *
 * @class utils
 * @static
 */

/**
 * For each element in the map, calls the callback with the key and value
 *
 * @method each
 * @static
 * @param {Object} map The object to iterate over
 * @param {Function} callback The callback to be called on every element of the
 * map. The function should take two arguments, key and value.
 * @return {Object} returns the original map
 */

function each(map, callback) {
    for (var k in map) {
        if (map.hasOwnProperty(k)) {
            var result = callback(k, map[k]);
            if (result === false) {
                break;
            }
        }
    }
    return map;
};

module.exports = {
    each: each
};
