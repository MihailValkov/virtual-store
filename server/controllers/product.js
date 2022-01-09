const productModel = require('../models/Product');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
  get: {},
  post: {
    addNewProduct: async (req, res) => {
      const {
        name,
        price,
        year,
        availablePieces,
        brand,
        model,
        description,
        colors,
        category,
        images,
      } = req.body;
      console.log(
        name,
        price,
        year,
        availablePieces,
        brand,
        model,
        description,
        colors,
        category,
        images
      );
      try {
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
