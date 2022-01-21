const userModel = require('../models/User');
const addressModel = require('../models/UserAddress');
const jwt = require('../utils/jwt');
const { errorHandler } = require('../utils/errorHandler');
const { cookie_name } = require('../config/config');
const { removeObjectFields } = require('../utils/removeSafeData');

const createToken = ({ _id, email, role }) => jwt.create({ _id, email, role });

module.exports = {
  get: {
    async profile(req, res) {
      try {
        const user = await userModel
          .findById(req.user._id)
          .populate('address')
          .populate('deliveryAddresses');

        return res.status(200).json(removeObjectFields(user.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async changeCurrentAddress(req, res, next) {
      const { id } = req.params;
      try {
        await addressModel.updateMany({ user: req.user._id }, { $set: { default: false } });
        const updatedAddress = await addressModel.findByIdAndUpdate(
          id,
          {
            $set: { default: true },
          },
          { new: true, runValidators: true }
        );
        res.status(200).json(removeObjectFields(updatedAddress.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  post: {
    async login(req, res, next) {
      const { email, password } = req?.body;
      if (email == '' || password == '') {
        return res.status(400).json({ message: 'All fields are required!' });
      }
      try {
        const user = await userModel
          .findOne({ email: { $regex: email, $options: 'i' } })
          .populate('address')
          .populate('deliveryAddresses');
        if (!user) {
          return res.status(409).json({ message: "Email or Password don't match!" });
        }
        const match = await user.comparePasswords(password);
        if (!match) {
          return res.status(409).json({ message: "Email or Password don't match!" });
        }
        const token = createToken(user);

        res
          .cookie(cookie_name, token, { httpOnly: true })
          .status(200)
          .json(removeObjectFields(user.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async register(req, res, next) {
      const { email, password, repeatPassword } = req?.body;
      if (password.trim() != repeatPassword.trim()) {
        return res.status(409).json({ message: "Passwords don't match!" });
      }
      try {
        let user = await userModel.findOne({ email: { $regex: email, $options: 'i' } });
        if (user) {
          return res.status(409).json({ message: 'Email is already taken!' });
        }
        user = await userModel.create({ email: email.trim(), password: password.trim() });
        const address = await addressModel.create({ default: true, user: user._id });
        user.address = address;
        user.deliveryAddresses.push(address);
        await user.save();

        const token = createToken(user);
        res
          .cookie(cookie_name, token, { httpOnly: true })
          .status(201)
          .json(removeObjectFields(user.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
    async logout(req, res, next) {
      req.user = null;
      res.status(200).clearCookie(cookie_name, { maxAge: 0, httpOnly: true }).json({ ok: true });
    },
    async addNewAddress(req, res, next) {
      const { country, city, street, streetNumber } = req.body;
      try {
        const user = await userModel.findById(req.user._id);
        const newAddress = await addressModel.create({
          country,
          city,
          street,
          streetNumber,
          user: user._id,
        });
        user.deliveryAddresses.push(newAddress);
        await user.save();
        res.status(200).json(removeObjectFields(newAddress.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  patch: {
    async profile(req, res) {
      const { city, country, newPassword, oldPassword, phone, street, streetNumber, username } =
        req.body;
      if (newPassword == '' || oldPassword == '' || oldPassword !== newPassword) {
        return res.status(409).json({ message: "Passwords don't match!" });
      }
      try {
        const user = await userModel.findById(req.user._id);
        if (oldPassword !== undefined && newPassword !== undefined) {
          const match = await user.comparePasswords(oldPassword);
          if (!match) {
            return res
              .status(409)
              .json({ message: 'Old Password is not correct! Please try again.' });
          }
          user.password = newPassword;
        }

        const address = await addressModel.findByIdAndUpdate(
          user.address._id,
          {
            city,
            country,
            street,
            streetNumber,
          },
          { new: true, runValidators: true }
        );
        user.address = address;
        user.phone = phone;
        user.username = username;

        const updatedUser = await user.save();
        return res.status(200).json(removeObjectFields(updatedUser.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  put: {
    async updateDeliveryAddress(req, res, next) {
      const { country, city, street, streetNumber } = req.body;
      const { id } = req.params;

      try {
        const address = await addressModel.findByIdAndUpdate(
          id,
          { country, city, street, streetNumber },
          { new: true, runValidators: true }
        );
        res.status(200).json(removeObjectFields(address.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
  delete: {
    async deleteAddress(req, res, next) {
      const { id } = req.params;
      try {
        const user = await userModel.findById(req.user._id);
        const deletedAddress = await addressModel.findByIdAndDelete(id);
        user.deliveryAddresses = user.deliveryAddresses.filter((x) => x._id != id);
        await user.save();
        res.status(200).json(removeObjectFields(deletedAddress.toObject()));
      } catch (error) {
        errorHandler(error, res, req);
      }
    },
  },
};
