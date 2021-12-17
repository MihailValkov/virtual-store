// const addressModel = require('../models/UserAddress');
// const userModel = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');

module.exports = {
  post: {
    async users(req, res) {
      const path = req.file.path;
      try {
        const uploadResponse = await cloudinary.uploader.upload(path, {
          upload_preset: 'virtual-store-users',
        });
        res.status(200).json({ imageUrl: uploadResponse.secure_url });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    },
    async products(req, res) {
      const files = req.files;
      try {
        Promise.all([
          ...files.map(({ path }) =>
            cloudinary.uploader.upload(path, {
              upload_preset: 'virtual-store-products',
            })
          ),
        ]).then((result) => res.status(201).json({ images: result.map((r) => r.secure_url) }));
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    },
  },
};
