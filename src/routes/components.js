const express = require('express');
const router = express.Router();
const uploadFileController = require('../app/controllers/UploadController');
const validate = require('../public/middleware/validate')

const multer = require('multer');
var upload = multer({ dest:'./src/public/uploads/' })


router.get('/email', uploadFileController.send_email);
router.get('/upload', uploadFileController.upload);
router.post('/upload', 
            upload.single('avatar'), 
            // validate(),
            uploadFileController.postUpload);

module.exports = router;
