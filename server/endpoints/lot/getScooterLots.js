var _ = require('lodash');

var Lot = require('../../mongo/lot');
var rh = require('../../util/res-handler.js');

module.exports = function (req, res) {
  Lot.find({ 'properties.JTYPE': 'SCOOTERS' }, function (err, docs) {
    if (err) {
      return rh.error(res, {
        responseCode: 500,
        message: _.get(err, 'error.errmsg') || err,
      });
    }

    return rh.success(res, {
      type: 'FeatureCollection',
      features: docs,
    });
  })
}
