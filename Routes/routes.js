const express = require('express');
const authController = require('../controllers/User');
const router = express.Router()
const { verifyToken } = require('../middlewear/jwtMiddleware');

router.post('/signup',authController.signup)
router.get('/getUser',verifyToken,authController.getUser)
router.get('/update', verifyToken, authController.updateUserByEmail);
router.get('/delete', verifyToken,authController.deleteUserByEmail)
router.get('/delete/:id', verifyToken, authController.deleteUserById);

module.exports = router;