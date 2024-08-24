module.exports = asyncHandleFunc => (req, res, next) => {
    Promise.resolve(asyncHandleFunc(req, res, next)).catch(next);
};