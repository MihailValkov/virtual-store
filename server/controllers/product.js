const productModel = require('../models/Product');
const userModel = require('../models/User');
const { errorHandler } = require('../utils/errorHandler');
const mapToStatus = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

module.exports = {
  get: {
    async products(req, res) {
      const { category } = req.params;
      try {
        const products = await productModel
          .find({
            category: { $regex: category, $options: 'i' },
          })
          .lean();
        return res.status(200).json({ products });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async product(req, res) {
      const { productId } = req.params;
      try {
        const record = await productModel
          .findById(productId)
          .populate({
            path: 'rating',
            populate: { path: 'comments', populate: { path: 'user', select: 'email image' } },
          })
          .lean();

        return res.status(200).json({ product: record });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  post: {
    async addNewProduct(req, res) {
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
      try {
        const record = await productModel.create({
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
        });
        res.status(201).json({ product: record });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  patch: {
    async rateProduct(req, res, next) {
      const { productId } = req.params;
      const { comment, userId, rating } = req.body;
      if (!userId) {
        return res.status(409).json({ message: 'No such a user!' });
      }
      try {
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'No such a user!' });
        }
        const product = await productModel.findByIdAndUpdate(productId);
        if (product.toObject().rating.comments.find((comment) => comment.user == userId)) {
          return res.status(403).json({ message: 'You have already rated this product!' });
        }
        product.rating.comments.push({
          user: userId,
          comment,
          status: mapToStatus[rating],
          rating,
        });
        product.rating.rate[rating]++;
        product.rating.totalRating += rating;
        await product.save();
        const updatedProduct = await productModel
          .findByIdAndUpdate(productId)
          .populate({
            path: 'rating',
            populate: { path: 'comments', populate: { path: 'user', select: 'email image' } },
          })
          .lean();

        await user.comments.push({ productId, comment, status: mapToStatus[rating], rating });
        await user.save();
        return res.status(200).json({ rating: updatedProduct.rating, status: mapToStatus[rating] });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
