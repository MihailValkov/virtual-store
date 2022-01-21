const router = require('express').Router();
const controller = require('../controllers/admin');
const { isAdmin } = require('../middlewares/authentication');

router.get('/orders/:id', isAdmin(), controller.get.order);
router.get('/orders', isAdmin(), controller.get.orders);
router.get('/users', isAdmin(), controller.get.users);

module.exports = router;
