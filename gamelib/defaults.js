var utils = require('./utils');

var mergeDefaults = function(options, defaults) {
    options = options || {};
    utils.each(defaults, function(k, v) {
        if (options[k] === undefined) {
            options[k] = v;
        }
    });
    return options;
};

module.exports = mergeDefaults;
