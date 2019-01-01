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

// Maximum Ranges
// A collection cannot have more than 64 indexes.
// The length of the index name cannot be longer than 125 characters.
// A compound index can have maximum 31 fields indexed.

userSchema.index({
  email: 'text',
  firstName: 'text',
  lastName: 'text',
  // jobTitle: 'text',
  // jobDescriptor: 'text',
  // jobArea: 'text',
  // jobType: 'text',
  // streetAddress: 'text',
  // streetPrefix: 'text',
  // streetName: 'text',
  // streetSuffix: 'text',
  city: 'text',
  state: 'text',
  zipCode: 'text'
})


const User = mongoose.model('User', userSchema)

module.exports = User
