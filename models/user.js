const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost:27017/LogIn")
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema);
