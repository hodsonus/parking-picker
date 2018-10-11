var mongoose = require('mongoose');
var _typesEnum = require('../constants').decals;

var currentOccupencySchema = new mongoose.Schema({
  time: { type: Date, required: true },
  fullness: { type: Number, required: true },
}, { _id: false });

var lotSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  history: { type: [currentOccupencySchema] },
  applicableDecals: { type: [String], enum: _decalEnum }
  maxOccupancy: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_updated',
  },
});
