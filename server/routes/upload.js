const router = require('express').Router();
const controller = require('../controllers/upload');
const { single, multiple } = require('../middlewares/file-upload');

router.post('/users', single(), controller.post.users);
router.post('/categories', single(), controller.post.categories);
router.post('/products', multiple(), controller.post.products);

router.delete('/products/:id', controller.delete.deleteById);

module.exports = router;
