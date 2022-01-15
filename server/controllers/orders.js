const orderModel = require('../models/Order');
const { errorHandler } = require('../utils/errorHandler');
const productModel = require('../models/Product');
const userModel = require('../models/User');

module.exports = {
  get: {
    async orders(req, res) {
      try {
        const orders = await orderModel.find({ userId: req.user._id }).lean();
        return res.status(200).json(orders);
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async order(req, res) {
      const { id } = req.params;
      try {
        const order = await orderModel
          .findById(id)
          .populate({ path: 'products', populate: '_id' })
          .lean();
        order.products = order.products.map((x) => ({
          finalPrice: x.finalPrice,
          quantity: x.quantity,
          selectedColor: x.selectedColor,
          ...x._id.toObject(),
          rating:
            (x._id.toObject().rating.totalRating / x._id.toObject().rating.comments?.length) * 20 ||
            0,
        }));
        return res.status(200).json(order);
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  post: {
    async createOrder(req, res) {
      const { userId, deliveryAddress, totalPrice, taxes, products, paymentMethod } = req.body;
      const ids = products.map((p) => p._id);
      try {
        const existingProducts = await productModel.find({ _id: ids });
        products.map((x) => {
          const product = existingProducts.find((p) => p._id == x._id);
          if (product.availablePieces - x.quantity < 0) {
            throw new TypeError(`${product.name} quantity is not available!`);
          }
          product.availablePieces -= x.quantity;
        });
        await Promise.all([...existingProducts.map((p) => p.save())]);
        const order = await orderModel.create({
          userId,
          deliveryAddress,
          totalPrice: Number(totalPrice),
          taxes: Number(taxes),
          products,
          paymentMethod,
        });
        await userModel.findByIdAndUpdate(userId, { $addToSet: { orders: order } });
        res.status(201).json(order.toObject());
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
