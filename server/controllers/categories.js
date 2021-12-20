const createErrorMessage = require('../utils/create-error-message');
const productModel = require('../models/Product');

const categories = [
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
const products = [
  {
    _id: 'p1123',
    images: [
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
    ],
    category: 'phone',
    colors: ['black', 'purple', 'yellow'],
    name: 'Huawei P30 Pro',
    price: 1659.85,
    year: 2018,
    availablePieces: 13,
    inStock: false,
    taxes: 5,
    brand: 'Huawei',
    model: 'P30 Pro',
    description: 'P30 Pro, Dual SIM, 128GB, 16GB RAM, 4G, Black',
    rating: 99,
  },
  {
    _id: 'p1224',
    images: [
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
    ],
    category: 'phone',
    colors: ['red', 'blue', 'yellow'],
    name: 'Huawei Nova',
    price: 359.85,
    year: 2021,
    availablePieces: 1,
    inStock: true,
    taxes: 5,
    brand: 'Huawei',
    model: 'Nova',
    description: 'Huawei Nova, Dual SIM, 128GB, 8GB RAM, 4G, Black',
    rating: 66,
  },
  {
    _id: 'p1325',
    images: [
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_a0ae106d44c5ef737055bf8ea9146941.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_624f129e976b8be5b997ec63be975bbc.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_c4117c439b862b7517cc87d2c57ac78c.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_da22c15b78ab4b9743a085ccc9dfd577.jpg',
      'https://s13emagst.akamaized.net/products/32170/32169398/images/res_110fe86401f58b10a8a223b14f017a8a.jpg',
    ],
    category: 'phone',
    colors: ['red', 'blue', 'green', 'black', 'purple', 'yellow'],
    name: 'Huawei Nova 9',
    price: 659.85,
    year: 2019,
    availablePieces: 51,
    inStock: true,
    taxes: 5,
    brand: 'Huawei',
    model: 'Nova 9',
    description: 'Huawei Nova 9, Dual SIM, 128GB, 8GB RAM, 4G, Black',
    rating: 85,
  },
];

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

        return res.status(200).json({ products: products });
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
      try {
        const product = await productModel.findByIdAndUpdate(productId);
        if(product.toObject().rating.comments.find(comment => comment.user == userId)){
          return res.status(403).json({ message: 'You have already rated this product!' });
        }
        const mapToStatus = {
          1: 'Poor',
          2: 'Fair',
          3: 'Good',
          4: 'Very Good',
          5: 'Excellent',
        };
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

        return res.status(200).json({ rating: updatedProduct.rating });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
