const userRouter = require('./user.js');
const ordersRouter = require('./orders.js');
const categoriesRouter = require('./categories.js');
const uploadRouter = require('./upload.js');


module.exports = app => {
    app.use('/api/auth', userRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/upload', uploadRouter);
};