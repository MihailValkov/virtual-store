const categories = [
  {
    _id: 'laptop',
    category: 'Laptop',
    imageUrl: 'http://localhost:5500/categories/computer.png',
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
    taxes:5,
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
    taxes:5,
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
    taxes:5,
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
      try {
        return res.status(200).json(products.concat(...products).concat(...products));
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
    async product(req, res) {
      const { productId } = req.params;
      try {
        return res.status(200).json(products.find((p) => p._id === productId));
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
  },
  post: {},
};
