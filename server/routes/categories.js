const router = require('express').Router();
const controller = require('../controllers/categories');

router.get('/', controller.get.categories);

module.exports = router;
