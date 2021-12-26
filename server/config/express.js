const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const whitelist = [
  'http://localhost:3000',
  'http://localhost:5500',
  'https://online-virtual-store.herokuapp.com',
];

module.exports = (app, express) => {
  app.use(express.static('public'));
  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(auth());
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });
};
