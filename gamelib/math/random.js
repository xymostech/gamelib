function random() {
    return Math.random();
}

function randomFloatRange(low, high) {
    return random() * (high - low) + low;
}

function randomIntRange(low, high) {
    return Math.floor(randomFloatRange(low, high + 1));
}

module.exports = {
    random: random,
    randomFloatRange: randomFloatRange,
    randomIntRange: randomIntRange
};
