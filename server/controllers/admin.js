const userModel = require('../models/User');
const orderModel = require('../models/Order');

const { errorHandler } = require('../utils/errorHandler');

module.exports = {
  get: {
    async order(req, res) {
      const { id } = req.params;
      try {
        const order = await orderModel
          .findById(id)
          .populate({ path: 'userId', select: 'username' });
        res.status(200).json({
          ...order.toObject(),
          username: order?.userId?.username,
          amount: order?.products?.length,
        });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async orders(req, res) {
      const page = parseInt(req?.query?.page);
      const limit = parseInt(req?.query?.limit);
      const search = req?.query?.search;
      const filter = req?.query?.filter;
      const skipIndex = (page - 1) * limit;
      let [regex, searchParams] = [null, {}];
      if (search && filter) {
        regex = new RegExp(search.trim() || '', 'i');
        searchParams =
          filter === 'totalPrice'
            ? { [filter]: Number(search) }
            : filter.toLowerCase().includes('id')
            ? { [filter]: search.trim() }
            : { [filter]: regex };
      }

      try {
        const count = await orderModel.countDocuments(searchParams);
        const records = await orderModel
          .find(searchParams)
          .limit(limit)
          .skip(skipIndex)
          .sort({ _id: 1 })
          .populate({ path: 'userId', select: 'username' })
          .lean();

        const orders = records.map((order) => ({
          _id: order._id,
          userId: order.userId?._id,
          username: order.userId?.username,
          deliveryAddress: order.deliveryAddress,
          createdAt: new Date(order.createdAt).toLocaleString(),
          status: order.status,
          paymentMethod: order.paymentMethod,
          amount: order.products?.length || 0,
          totalPrice: order.totalPrice,
        }));
        res.status(200).json({ orders, count });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async users(req, res) {
      const page = parseInt(req?.query?.page);
      const limit = parseInt(req?.query?.limit);
      const search = req?.query?.search;
      const filter = req?.query?.filter;
      const skipIndex = (page - 1) * limit;
      let [regex, searchParams] = [null, {}];
      if (search && filter) {
        regex = new RegExp(search.trim() || '', 'i');
        searchParams =
          filter === 'totalPrice'
            ? { [filter]: Number(search) }
            : filter.toLowerCase().includes('id')
            ? { [filter]: search.trim() }
            : { [filter]: regex };
      }

      try {
        const count = await userModel.countDocuments(searchParams);
        const records = await userModel
          .find(searchParams)
          .limit(limit)
          .skip(skipIndex)
          .sort({ _id: 1 })
          .populate({ path: 'address' })
          .lean();

        const users = records?.map((user) => ({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: `${user.address.country}, ${user.address.city} , ${user.address.street} № ${user.address.streetNumber}`,
          orders: user.orders?.length || 0,
          comments: user.comments?.length || 0,
        }));

        res.status(200).json({ users, count });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  post: {},
};
