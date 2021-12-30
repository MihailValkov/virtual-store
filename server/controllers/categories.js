const createErrorMessage = require('../utils/create-error-message');
const productModel = require('../models/Product');
const userModel = require('../models/User');

let categories = [];
if (process.env.NODE_ENV === 'production') {
  categories = [
    {
      _id: 'laptop',
      category: 'Laptop',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/laptop.png',
    },
    {
      _id: 'computer',
      category: 'Computer',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/computer.png',
    },
    {
      _id: 'computer_accessories',
      category: 'Computer Accessories',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/accessories.png',
    },
    {
      _id: 'monitor',
      category: 'Monitor',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/monitor.png',
    },
    {
      _id: 'tablet',
      category: 'Tablet',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/tablet.png',
    },
    {
      _id: 'phone',
      category: 'Phone',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/phone.png',
    },
    {
      _id: 'tv',
      category: 'Tv',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/tv.png',
    },
    {
      _id: 'camera',
      category: 'Camera',
      imageUrl: 'https://online-virtual-store.herokuapp.com/categories/camera.png',
    },
  ];
} else {
  categories = [
    {
      _id: 'laptop',
      category: 'Laptop',
      imageUrl: 'http://localhost:5500/categories/laptop.png',
    },
    {
      _id: 'computer',
      category: 'Computer',
      imageUrl: 'http://localhost:5500/categories/computer.png',
    },
    {
      _id: 'computer_accessories',
      category: 'Computer Accessories',
      imageUrl: 'http://localhost:5500/categories/accessories.png',
    },
    {
      _id: 'monitor',
      category: 'Monitor',
      imageUrl: 'http://localhost:5500/categories/monitor.png',
    },
    {
      _id: 'tablet',
      category: 'Tablet',
      imageUrl: 'http://localhost:5500/categories/tablet.png',
    },
    {
      _id: 'phone',
      category: 'Phone',
      imageUrl: 'http://localhost:5500/categories/phone.png',
    },
    {
      _id: 'tv',
      category: 'Tv',
      imageUrl: 'http://localhost:5500/categories/tv.png',
    },
    {
      _id: 'camera',
      category: 'Camera',
      imageUrl: 'http://localhost:5500/categories/camera.png',
    },
  ];
}

const mapToStatus = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

module.exports = {
  get: {
    async categories(req, res) {
      try {
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
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
        return res.status(404).json({ message: 'Not Found 404' });
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
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
  },
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
        if (error instanceof TypeError || error.name == 'MongoError') {
          console.log(`${req.method} >> ${req.baseUrl}: ${error.message}`);
          return res.status(500).json({ message: 'Something went wrong!' });
        } else {
          const message = createErrorMessage(error);
          res.status(400).json({ message });
        }
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
        if (error instanceof TypeError || error.name == 'MongoError') {
          console.log(`${req.method} >> ${req.baseUrl}: ${error.message}`);
          return res.status(500).json({ message: 'Something went wrong!' });
        } else {
          const message = createErrorMessage(error);
          res.status(400).json({ message });
        }
      }
    },
  },
};
