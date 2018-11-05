var rh = require('../../util/res-handler');
var safe = require('../../util/user').safe;
var User = require('../../mongo/user');

module.exports = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var decals = req.body.decals;

  if (!username || !password || !decals)
    return rh.error(res, { message: 'Username, password, and decal array required', responseCode: 400 });

  var newUser = new User({
    username,
    password,
    decals
  });

  newUser.save(function (err, usr) {
    if (err) {
      console.log(err);
      return rh.error(res, { message: 'Failed to create user', responseCode: 500 });
    }

    return rh.success(res, safe(usr.toObject()));
  })
}
