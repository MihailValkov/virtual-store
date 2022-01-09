const { cloudinaryUploadImage, cloudinaryDeleteImage } = require('../utils/cloudinary');

const userModel = require('../models/User');
const { errorHandler } = require('../utils/errorHandler');

module.exports = {
  post: {
    async users(req, res) {
      const { userId } = req.body;
      const path = req.file.path;
      try {
        const response = await cloudinaryUploadImage(path, 'virtual-store-users');
        const user = await userModel.findByIdAndUpdate(userId, {
          image: { _id: response.public_id, url: response.secure_url },
        });

        if (user.image?._id) {
          await cloudinaryDeleteImage(user.image?._id);
        }
        res.status(200).json({ _id: response.public_id, url: response.secure_url });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async products(req, res) {
      const files = req.files;
      try {
        Promise.all([
          ...files.map(({ path }) => cloudinaryUploadImage(path, 'virtual-store-products')),
        ]).then((result) => res.status(201).json({ images: result.map((r) => r.secure_url) }));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async categories(req, res) {
      const path = req.file.path;
      try {
        const response = await cloudinaryUploadImage(path, 'virtual-store-categories');

        res.status(200).json({ _id: response.public_id, url: response.secure_url });
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  delete: {
    async deleteById(req, res, next) {
      const { id } = req.params;
      try {
        await cloudinaryDeleteImage(`virtual-store/images/users/${id}`);
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
