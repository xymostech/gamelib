function random() {
    return Math.random();
}

function randomFloatRange(low, high) {
    return random() * (high - low) + low;
}

function randomIntRange(low, high) {
    return Math.floor(randomFloatRange(low, high + 1));
}

function randomBool() {
    return random() < 0.5;
}

module.exports = {
    random: random,
    randomFloatRange: randomFloatRange,
    randomIntRange: randomIntRange,
    randomBool: randomBool
};
