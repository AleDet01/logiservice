const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth(), userController.getMe);

router.get('/', auth('admin'), userController.getAllUsers);
router.get('/:id', auth('admin'), userController.getUserById);
router.put('/:id', auth('admin'), userController.updateUser);
router.delete('/:id', auth('admin'), userController.deleteUser);
router.get('/role/:role', auth('admin'), userController.getUsersByRole);

module.exports = router;