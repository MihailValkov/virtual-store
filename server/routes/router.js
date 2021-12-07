const userRouter = require('./user.js');
const ordersRouter = require('./orders.js');


module.exports = app => {
    app.use('/api/auth', userRouter);
    app.use('/api/orders', ordersRouter);
};