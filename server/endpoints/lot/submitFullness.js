var _ = require('lodash');

var rh = require('../../util/res-handler');
var Lot = require('../../mongo/lot');

module.exports = function (req, res) {
  var officialId = req.body.officialId;
  var fullness = req.body.fullness;

  if (!fullness) return rh.error(res, { responseCode: 400, message: 'Fullness required' });

  Lot.findOneAndUpdate(
    { officialId },
    {
      $push: {
        'properties.history': { fullness, time: new Date() }
      },
    },
    function (err, lot) {
      console.log('update: ', lot, 'err: ', err);
      if (err) {
        return rh.error(res, {
          responseCode: 500,
          message: _.get(err, 'error.errmsg') || err,
        });
      }

      return rh.success(res, 'Success');
    }
  )
}
