var each = function(map, callback) {
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
