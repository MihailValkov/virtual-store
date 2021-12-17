const router = require('express').Router();
const controller = require('../controllers/upload');
const { single, multiple } = require('../middlewares/file-upload');

router.post('/users', single(), controller.post.users);
router.post('/products', multiple(), controller.post.products);

module.exports = router;
