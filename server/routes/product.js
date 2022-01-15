const router = require('express').Router();
const controller = require('../controllers/product');

router.get('/:category', controller.get.products);
router.get('/:category/:productId', controller.get.product);

router.post('/', controller.post.addNewProduct);

router.patch('/:productId', controller.patch.rateProduct);

module.exports = router;
