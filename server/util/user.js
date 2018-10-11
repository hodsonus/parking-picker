var bcrypt = require('bcrypt');

module.exports = {
  hashPassword: function (password) {
    return bcrypt.hash(password, 12);
  }
  verifyPassword: function (submitted, current) {
    return bcrypt.compare(
      submitted,
      current,
    );
  }
}
