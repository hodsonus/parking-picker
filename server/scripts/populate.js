var lots = require('./parking_lots');

console.log('length:', lots.features.length);
console.log('ids', lots.features.map(function (f) { return f.properties.OBJECTID }));
console.log('ids', lots.features.map(function (f) { return f.properties.DECAL }));
