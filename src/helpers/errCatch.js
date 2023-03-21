exports.errCatch = function errCatch(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(err => {
      next(err);
    });
  };
};
