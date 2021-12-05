const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const whitelist = ['http://localhost:3000'];

module.exports = (app, express) => {
    app.use(express.static('static'));
    app.use(cors({ origin: whitelist, credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(auth());
};
