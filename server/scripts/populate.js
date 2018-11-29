var mongoose = require('mongoose');
var config = require('../config');
var _ = require('lodash');

var lots = require('./parking_lots').features;
var Lot = require('../mongo/lot');
var scoot = require('./scooters').features;

console.log('length:', lots.length);
console.log('decals', _.uniqBy(
  lots.map(function (f) { return f.properties.DECAL }),
  function (f) { return f }
));
console.log('example', lots[0].geometry);

function fixDecals (l) {
  if (l.properties.DECAL === 'Red One') _.set(l, 'properties.DECAL', 'Red 1');
  if (l.properties.DECAL === 'Brown3') _.set(l, 'properties.DECAL', 'Brown 3');
  if (l.properties.DECAL === 'All Decal') _.set(l, 'properties.DECAL', 'Any Decal');
  return l;
}

function prune (l) {
  return !(
    l.properties.DECAL.includes('PKY') ||
    l.properties.DECAL === 'State' ||
    l.properties.DECAL === 'Visitor'
  );
}

function matchSchema (l) {
  return {
    geometry: l.geometry,
    type: 'Feature',
    properties: {
      decalRestriction: l.properties.DECAL,
      officialId: l.properties.OBJECTID,
      JTYPE: l.properties.JTYPE,
    },
  }
}

function matchScootSchema (l) {
  return {
    geometry: l.geometry,
    type: 'Feature',
    properties: {
      decalRestriction: 'Motorcycle / Scooter',
      officialId: ((Math.random() * 100000) + 10000).toString(10),
      JTYPE: l.properties.JTYPE,
    },
  }
}

mongoose.connect(config.mongo.url, { useNewUrlParser: true });

var arrayLots = lots.filter(prune).map(fixDecals).map(matchSchema);
var arrayScoot = scoot.map(matchScootSchema);
var arrayComplete = arrayLots.concat(arrayScoot);

Lot.insertMany(arrayComplete,
  function (err, docs) {
    if (err) console.log('An error has occured', err);
    else console.log('Success!', docs);
  }
);
