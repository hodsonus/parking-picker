var rh = require('../../util/res-handler');
var Lot = require('../../mongo/lot');

module.exports = function(req, res) {
  var lotId = req.body.lotId;
  var fullness = req.body.fullness;

  var lot = Lot.findById(lotId);
  lot.history.push({ time: new Date(), fullness: fullness });

  lot.save(function(err) {
    if (err) return rh.error(res, { responseCode: 500, message: err });

    return rh.success(res, 'Success');
  });
}
