const router = require('express').Router();
const controller = require('../controllers/user');
const { isAuthNeeded } = require('../middlewares/authentication');

router.post('/login', isAuthNeeded(false), controller.post.login);
router.post('/register', isAuthNeeded(false), controller.post.register);
router.post('/logout', isAuthNeeded(), controller.post.logout);

router.get('/profile', isAuthNeeded(), controller.get.profile);

module.exports = router;
