const router = require('express').Router();
const controller = require('../controllers/orders');
const { isAuthNeeded } = require('../middlewares/authentication');

router.get('/', controller.get.orders);
router.get('/:id', controller.get.order);

router.post('/', controller.post.createOrder);

module.exports = router;
