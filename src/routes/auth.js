const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

router.get('/sign_up', authController.getSignUp);
router.post('/sign_up', authController.postSignUp);

router.post('/sign_in', authController.postLogin);

router.get('/logout', authController.logout);
router.get('/', authController.login);


module.exports = router;

