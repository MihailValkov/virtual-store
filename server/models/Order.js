const { Schema, model } = require('mongoose');
const enumStatus = ['Pending', 'Completed'];
// const enumCategories = [
//   'Laptop',
//   'Computer',
//   'Computer Accessories',
//   'Monitor',
//   'Tablet',
//   'Phone',
//   'Tv',
//   'Camera',
// ];

const orderSchema = new Schema(
  {
    status: {
      type: String,
      default: 'Pending',
      enum: {
        values: enumStatus,
        message: '{VALUE} is not a valid status for this order!',
      },
    },
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        finalPrice: Number,
        quantity: Number,
        selectedColor: String,
      },
    ],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    taxes: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    deliveryAddress: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
