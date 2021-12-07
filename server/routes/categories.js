const router = require('express').Router();
const controller = require('../controllers/categories');

router.get('/', controller.get.categories);
router.get('/:category', controller.get.products);
router.get('/:category/:productId', controller.get.product);

module.exports = router;
