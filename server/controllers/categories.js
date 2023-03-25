const categoryModel = require('../models/Category');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
  get: {
    async categories(req, res) {
      try {
        const categories = await categoryModel.find().sort({ category: 'asc' });
        res.status(200).json(categories);
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  post: {
    async addNewCategory(req, res) {
      const { category, image } = req.body;
      try {
        const newCategory = await categoryModel.create({ category: category.toLowerCase(), image });
        res.status(201).json(newCategory.toObject());
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
