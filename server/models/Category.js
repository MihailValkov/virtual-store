const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      minLength: [2, 'Category should be at least 2 characters long!'],
    },
    image: {
      _id: { type: String, default: '' },
      url: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);
