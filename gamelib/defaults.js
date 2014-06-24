var utils = require('./utils');

/**
 * Merges an options object with a defaults object, adding in defaults when the
 * options don't specify.
 *
 * Usage:
 *
 *     options = defaults(options, {
 *         // defaults in here
 *     });
 *
 * @method defaults
 * @for defaults
 * @param {Object} options The specified options
 * @param {Object} defaults The default choices for the options
 */

function defaults(options, defaults) {
    options = options || {};
    utils.each(defaults, function(k, v) {
        if (options[k] === undefined) {
            options[k] = v;
        }
    });
    return options;
};

module.exports = defaults;
