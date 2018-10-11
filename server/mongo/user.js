var mongoose = require('mongoose');
var _typesEnum = require('../constants').decals;
var hashPassword = require('../util/user').hashPassword;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  privateKey: { type: String, required: true },
  decals: { type: String, enum: _typesEnum },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_updated',
  },
});

userSchema.pre('save', async function preSave(next) {
  if (this.isNew && this.password) {
    this.password = hashPassword(this.password);
  }

  next();
});
