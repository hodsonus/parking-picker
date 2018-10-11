var resHandler = require('../util/res-handler');

module.exports = function (req, res) {
  resHandler.success(res, 'Hello world!');
}
