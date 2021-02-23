const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');

// // GET: api/courses
router.post('/create', apiController.create);
router.put('/update_put/:id', apiController.update_put);
router.patch('/update_patch/:id', apiController.update_patch);

router.get('/courses', apiController.courses);

module.exports = router;

