var resHandler = require('../util/res-handler');

module.exports = function (req, res, next) {
  if (!req.user || req.user.error) {
    return resHandler.error(res, { message: 'Unauthorized', responseCode: 401 });
  }

  return next();
}
