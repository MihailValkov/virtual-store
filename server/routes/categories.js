const router = require('express').Router();
const controller = require('../controllers/categories');

router.get('/', controller.get.categories);

router.post('/', controller.post.addNewCategory);

module.exports = router;
