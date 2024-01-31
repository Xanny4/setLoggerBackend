const controller = require('../controllers/Exercise');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');

router.get('/', cacheNoStore, controller.getExercises);
router.get('/:id', cacheNoStore, controller.getExerciseById);
router.post('/', cacheNoStore, controller.createExercise);
router.put('/:id', cacheNoStore, controller.modifyExercise);
router.delete('/:id', cacheNoStore, controller.deleteExercise);

module.exports = router;