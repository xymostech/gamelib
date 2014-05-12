function getTime() {
    return (new Date()).getTime();
}

if (window.performance && window.performance.now) {
    getTime = window.performance.now.bind(window.performance);
}

module.exports = getTime;
