const controller = require('../controllers/User');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', cacheNoStore, controller.getAllUsers);
router.post('/authenticate', cacheNoStore, controller.authenticate);
router.post('/', cacheNoStore, controller.createUser);
router.put('/:id', cacheNoStore, controller.modifyUser);
router.delete('/:id', cacheNoStore, controller.deleteUser);

router.get('/protected-data', verifyToken, controller.protectedRouteHandler);

module.exports = router;