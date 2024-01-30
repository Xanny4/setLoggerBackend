const controller = require('../controllers/Set');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');

router.get('/', cacheNoStore, controller.getSets);
router.get('/:id', cacheNoStore, controller.getSetById);
router.post('/', cacheNoStore, controller.createSet);
router.put('/:id', cacheNoStore, controller.modifySet);
router.delete('/:id', cacheNoStore, controller.deleteSet);


module.exports = router;