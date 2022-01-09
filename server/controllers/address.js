const addressModel = require('../models/UserAddress');
const userModel = require('../models/User');

const { errorHandler } = require('../utils/errorHandler');

module.exports = {
  post: {
    addNewAddress: async (req, res) => {
      const { country, city, street, streetNumber } = req.body;
      try {
        const user = await userModel.findById(req.user._id);
        const newAddress = await addressModel.create({ country, city, street, streetNumber },{ new: true });
        user.deliveryAddresses.push(newAddress);
        await user.save();
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
