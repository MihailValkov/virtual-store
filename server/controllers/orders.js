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
    quantity:2,
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
    quantity:3,
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
    quantity:1,
  },
];

const orders_dummy = [
  {
    _id: '123ff234sdf2342asd11',
    date: '06 May 2021, 16:52',
    address: 'Bulgaria, Sofia',
    status: 'Pending',
    products: products,
    totalQuantity: 3,
    totalPrice: 1551.99,
  },
  {
    _id: '123ff234sdf2342asd12',
    date: '03 June 2021, 11:00',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    products: products.slice(0, 1),
    totalQuantity: 1,
    totalPrice: 599.65,
  },
  {
    _id: '123ff234sdf2342asd13',
    date: '01 Jan 2021, 10:55',
    address: 'Bulgaria, Burgas',
    status: 'Pending',
    products: products.slice(0, 2),
    totalQuantity: 2,
    totalPrice: 1029.99,
  },
];

module.exports = {
  get: {
    async orders(req, res) {
      try {
        return res.status(200).json(orders_dummy);
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
    async order(req, res) {
      const { id } = req.params;
      try {
        return res.status(200).json(orders_dummy.find((o) => o._id === id));
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
  },
  post: {},
};
