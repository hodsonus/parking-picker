var mongoose = require('mongoose');
var _typesEnum = require('../constants').getDecals();

var currentOccupencySchema = new mongoose.Schema({
  time: { type: Date, required: true },
  fullness: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
}, { _id: false });

var lotSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  history: { type: [currentOccupencySchema] },
  applicableDecals: { type: [String], enum: _typesEnum },
  maxOccupancy: { type: Number, required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_updated'
  }
});
