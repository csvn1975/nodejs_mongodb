module.exports = {
    mongooseToObject: function (inputData) {
        return inputData.map((item) => item.toObject());
    },
};
