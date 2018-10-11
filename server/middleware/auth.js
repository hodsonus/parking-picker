var getSession = require('../util/session');
var User = require('../mongo/user');

module.exports = function (req, res, next) {
  if (!req.headers.Authorization) {
    req.user = { error: { message: 'invalid authorization' } };
    return next();
  }

  var access_token = req.headers.Authorization
    .replace('Bearer ', '')
    .replace('bearer ', '');

  var session = getSession(access_token);
  if (!session) {
    req.user = { error: 'Invalid authorization' };
    return next();
  }
  User.findById(session._id, function (err, user) {
    if (err || !user) {
      req.user = { error: 'Invalid authorization' };
      return next();
    }

    req.user = user;
    next();
  })
}
