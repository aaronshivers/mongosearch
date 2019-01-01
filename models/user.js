const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 8,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100
  },
  firstName: { type: String },
  lastName: { type: String },
  jobTitle: { type: String },
  jobDescriptor: { type: String },
  jobArea: { type: String },
  jobType: { type: String },
  streetAddress: { type: String },
  streetPrefix: { type: String },
  streetName: { type: String },
  streetSuffix: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  admin: {
    type: Boolean,
    required: false,
    default: false
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
