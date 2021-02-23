const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UsersController');
const multer = require('multer');
const upload = multer({ dest: './src/public/uploads/'})

router.get('/create', userController.create);
router.post('/create', upload.single('avatar'), userController.create_post);
router.get('/', userController.list);
module.exports = router;

