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

module.exports = {
  get: {
    async categories(req, res) {
      const { category } = req.query;
      console.log(req.query);
      try {
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(404).json({ message: 'Not Found 404' });
      }
    },
  },
  post: {},
};
