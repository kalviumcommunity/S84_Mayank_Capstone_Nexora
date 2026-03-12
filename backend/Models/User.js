const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  displayName: {
    type: String
  },
  googleId: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('User', userSchema);