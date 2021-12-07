const userRouter = require('./user.js');
const ordersRouter = require('./orders.js');
const categoriesRouter = require('./categories.js');


module.exports = app => {
    app.use('/api/auth', userRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/categories', categoriesRouter);
};