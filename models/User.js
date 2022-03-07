const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

mongoose.NativeDate
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  DoB: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
