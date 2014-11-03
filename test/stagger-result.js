function staggerResult (callback) {
    return function (result) {
        callback(null, result);
    };
}

module.exports = staggerResult;
