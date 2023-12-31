const mongoose = require('mongoose')
const { Role } = require('../utils/roles')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add your first name.']
  },
  lastName: {
    type: String,
    required: [true, 'Please add your last name.']
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email.'
    ]
  },
  termsAndConditions: {
    type: Boolean,
    required: [true, 'Please accept the terms and conditions.']
  },
  role: {
    type: Number,
    default: Role.User
  },
  password: {
    type: String,
    required: [true, 'Please add a password.'],
    minlength: 6,
    select: false
  },
  profilePicture: {
    type: String,
    default: 'nothing'
  },
  createdAt: {
    type: Date,
    default: function () {
      return Date.now()
    }
  }
})

module.exports = mongoose.model('user', UserSchema)
