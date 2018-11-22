var _ = require('lodash');

var buildings = require('../../constants/buildings');
var rh = require('../../util/res-handler.js');

function _toGeojsonPoint (buildingObj) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [+buildingObj.LON, +buildingObj.LAT],
    },
    properties: {
      ..._.omit(buildingObj, ['LAT', 'LON']),
    }
  };
}

module.exports = function (req, res) {
  const retval = {
    type: 'FeatureCollection',
    features: buildings.map(_toGeojsonPoint),
  }

  return rh.success(res, retval);
}
