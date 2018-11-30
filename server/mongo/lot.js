var mongoose = require('mongoose');

var currentOccupencySchema = new mongoose.Schema({
  time: { type: Date, required: true },
  fullness: {
    type: Number,
    required: true,
  }
}, { _id: false });

var lotSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['Feature'] },
  properties: {
    history: { type: [currentOccupencySchema] },
    decalRestriction: { type: String, required: true },
    officialId: { type: String, required: true },
    JTYPE: { type: String, enum: ['PARKING_LOT', 'SCOOTERS'] },
  },
  geometry: {
    type: {
      type: String,
      enum: ['MultiPolygon', 'Polygon', 'Point'],
      required: true,
    },
    coordinates: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_updated'
  }
});

var Lot = mongoose.model('Lot', lotSchema);

module.exports = Lot;
