const { Schema, model } = require('mongoose');
const enumColors = ['red', 'blue', 'green', 'black', 'purple', 'yellow'];
const enumCategories = [
  'Laptop',
  'Computer',
  'Computer Accessories',
  'Monitor',
  'Tablet',
  'Phone',
  'Tv',
  'Camera',
];

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, 'Product name should be at least 4 characters long!'],
    },
    price: {
      type: Number,
      required: true,
      min: [0.001, 'Price should be a positive number!'],
    },
    year: {
      type: Number,
      required: true,
      validate: {
        validator: (v) =>
          Number(v) <= new Date().getFullYear() && Number(v) >= new Date().getFullYear() - 20,
        message: () =>
          `Year should be between ${
            new Date().getFullYear() - 20
          } and ${new Date().getFullYear()}!`,
      },
    },
    availablePieces: {
      type: Number,
      required: true,
      min: [0, 'Available pieces should be greater than zero!'],
    },
    brand: {
      type: String,
      required: true,
      minLength: [3, 'Brand should be at least 3 characters long!'],
    },
    model: {
      type: String,
      required: true,
      minLength: [3, 'Model should be at least 3 characters long!'],
    },
    description: {
      type: String,
      required: true,
      minLength: [20, 'Description should be at least 20 characters long!'],
    },
    colors: [
      {
        type: String,
        enum: {
          values: enumColors,
          message: '{VALUE} is not a valid color for this product!',
        },
      },
    ],
    category: {
      type: String,
      enum: {
        values: enumCategories,
        message: '{VALUE} is not a valid category for this product!',
      },
    },
    images: [
      {
        type: String,
        validate: {
          validator: (v) => /^https?:\/\/.+/.test(v),
          message: (props) => `${props.value} is not a valid Image URL!`,
        },
      },
    ],
    taxes: {
      type: Number,
      default: 5,
    },
    rating: {
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
          comment: {
            type: String,
            required: true,
            minLength: [20, 'Comment should be at least 20 characters long!'],
          },
          status: String,
          rating: {
            type: Number,
            min: [1, 'Please select correct rating between 1-5!'],
            max: [5, 'Please select correct rating between 1-5!'],
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      rate: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 },
      },
      totalRating: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
