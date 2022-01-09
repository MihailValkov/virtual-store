const { Schema, model } = require('mongoose');
const enumStatus = ['Pending', 'Completed'];

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
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
