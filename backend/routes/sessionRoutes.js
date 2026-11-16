const router = require('express').Router();
const c = require('../controllers/sessionController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', c.list);
router.get('/event/:eventId', c.byEvent);
router.post('/', protect, authorize('admin'), c.create);
router.put('/:id', protect, authorize('admin'), c.update);
router.delete('/:id', protect, authorize('admin'), c.remove);

module.exports = router;