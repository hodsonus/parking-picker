var lots = require('../../scripts/parking_lots');
var rh = require('../../util/res-handler.js');

module.exports = function (req, res) {
  rh.success(res, lots);
}
