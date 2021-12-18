const userModel = require('../models/User');
const createErrorMessage = require('../utils/create-error-message');
const { cloudinary } = require('../utils/cloudinary');

module.exports = {
  post: {
    async users(req, res) {
      const { userId } = req.body;
      const path = req.file.path;
      try {
        const uploadResponse = await cloudinary.uploader.upload(path, {
          upload_preset: 'virtual-store-users',
        });

        const user = await userModel.findByIdAndUpdate(userId, {
          image: { _id: uploadResponse.public_id, url: uploadResponse.secure_url },
        });
        
        if (user.image?._id) {
          await cloudinary.api.delete_resources([user.image?._id], (error, result) => {
            if (error) {
              throw new Error('Provided public_id is not correct!');
            }
          });
        }
        res.status(200).json({ _id: uploadResponse.public_id, url: uploadResponse.secure_url });
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
  delete: {
    async deleteById(req, res, next) {
      const { id } = req.params;
      try {
        const deletedImage = await cloudinary.api.delete_resources(
          [`virtual-store/images/users/${id}`],
          (error, result) => {
            if (error) {
              return res.status(409).json({ message: 'Something went wrong' });
            }
            return res.status(202).json({ item: result });
          }
        );
      } catch (error) {}
    },
  },
};
