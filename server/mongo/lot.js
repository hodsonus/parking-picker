var mongoose = require('mongoose');

var currentOccupencySchema = new mongoose.Schema({
  time: { type: Date, required: true },
  fullness: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}, { _id: false });

currentOccupencySchema.pre('validate', function (next) {
  if (this.isNew) {
    this.time = new Date();
  }

  return next();
})

var lotSchema = new mongoose.Schema({
  // name: { type: String, unique: true, required: true },
  history: { type: [currentOccupencySchema] },
  decalRestriction: { type: String, required: true },
  // maxOccupancy: { type: Number, required: true },
  officialId: { type: String, required: true },
  geometry: {
    type: {
      type: String,
      enum: ['MultiPolygon', 'Polygon'],
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
