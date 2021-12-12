const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  country: {
    type: String,
    default: 'Country',
    required: true,
    minLength: [4, 'Country should be at least 4 characters long!'],
  },
  city: {
    type: String,
    default: 'City',
    required: true,
    minLength: [4, 'City should be at least 4 characters long!'],
  },
  street: {
    type: String,
    default: 'Street',
    required: true,
    minLength: [4, 'Street should be at least 4 characters long!'],
  },
  streetNumber: {
    type: Number,
    default: 1,
    required: true,
    minLength: [1, 'Street number should be at least 1 character!'],
  },
  default: {
    type: Boolean,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
module.exports = model('Address', addressSchema);
