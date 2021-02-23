const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CoursesController');
const requireAuthMiddleware = require('../public/middleware/requireAuthMiddleware')


// ROUTER

router.get('/create', courseController.create);
router.post('/add', courseController.add);
router.post('/handle', courseController.handleDeletes);


router.get('/:id/edit',  requireAuthMiddleware, courseController.edit); // es kann biliebiger Name (:id!)
router.put('/:id/update', courseController.update);
router.patch('/:id/restore', courseController.restore);

router.delete('/:id/delete', courseController.delete);
router.delete('/:id/destroy', courseController.destroy);

router.get('/trash', courseController.trash);
router.get('/list', courseController.index);

router.get('/', courseController.showCard);

module.exports = router;
