var bcrypt = require('bcrypt');
var _ = require('lodash');

module.exports = {
  hashPassword: function (password) {
    return bcrypt.hash(password, 12);
  },
  verifyPassword: function (submitted, current) {
    return bcrypt.compare(
      submitted,
      current
    );
  },
  safe: function(user) {
    return _.omit(user, ['password']);
  }
}
