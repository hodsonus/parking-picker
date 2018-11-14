var _ = require('lodash');

var rh = require('../../util/res-handler');
var Lot = require('../../mongo/lot');

module.exports = function (req, res) {
  var officialId = req.body.officialId;
  var fullness = req.body.fullness;

  if (!fullness) return rh.error(res, { responseCode: 400, message: 'Fullness required' });

  try {
    Lot.findOne(
      { 'properties.officialId': officialId },
      function (err, doc) {
        if (err) return rh.error(res, { responseCode: 500, message: err });
        console.log(doc);
        if (!doc) return rh.error(res, { responseCode: 404, message: 'Lot not found' });
        doc.properties.history.push({ fullness, time: new Date() });

        doc.save(function (err) {
          if (err) return rh.error(res, { responseCode: 500, message: err });
          rh.success(res, 'Success');
        });
      }

    )
  } catch (err) {
    return rh.error(res, { responseCode: 500, message: err });
  }
}
