const router = require('express').Router();
const controller = require('../controllers/user');
const { isAuthNeeded } = require('../middlewares/authentication');

router.post('/login', isAuthNeeded(false), controller.post.login);
router.post('/register', isAuthNeeded(false), controller.post.register);
router.post('/logout', isAuthNeeded(), controller.post.logout);
router.post('/address', isAuthNeeded(), controller.post.addNewAddress);

router.patch('/profile', isAuthNeeded(), controller.patch.profile);

router.delete('/address/:id', isAuthNeeded(), controller.delete.deleteAddress);

router.get('/address/:id', isAuthNeeded(), controller.get.changeCurrentAddress);
router.put('/address/:id', isAuthNeeded(), controller.put.updateDeliveryAddress);
router.get('/profile', isAuthNeeded(), controller.get.profile);

module.exports = router;
