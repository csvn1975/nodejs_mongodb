const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.edit);
router.get('/email', newsController.sendEmail);
router.get('/', newsController.index);

module.exports = router;
