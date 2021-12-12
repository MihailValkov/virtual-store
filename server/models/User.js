const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { rounds } = require('../config/config');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!'],
    },
    username: {
      type: String,
      default: 'Username',
      minLength: [4, 'Username should be at least 4 characters long!'],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, 'Password should be at least 4 characters long!'],
    },
    imageUrl: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8iiAjB9x1X1KlcfkYJRRKxDZJ7x2eyoTnQ&usqp=CAU',
    },
    role: {
      type: String,
      enum: ['Member', 'Admin'],
      default: 'Member',
    },
    phone: {
      type: String,
      default: '+359 888 888 888',
      required: [true, 'Phone number is required!'],
    },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    deliveryAddresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  },
  { timestamps: true }
);

userSchema.methods.comparePasswords = function (pass) {
  return bcrypt.compare(pass, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hash = await bcrypt.hash(this.password, rounds);
      this.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = model('User', userSchema);
