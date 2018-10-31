var mongoose = require('mongoose');
var typesEnum = require('../constants').getDecals();
var hashPassword = require('../util/user').hashPassword;

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  decals: { type: [String], enum: typesEnum }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'last_updated'
  }
});

userSchema.pre('save', function (next) {
  if (this.isNew && this.password) {
    this.password = hashPassword(this.password);
  }

  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
