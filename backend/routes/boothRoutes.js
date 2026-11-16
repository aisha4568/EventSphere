const router = require('express').Router();
const c = require('../controllers/boothController');
const { protect, authorize } = require('../middleware/auth');

router.get('/event/:eventId', c.byEvent);
router.post('/', protect, authorize('admin'), c.create);
router.post('/reserve', protect, authorize('exhibitor'), c.reserve);
router.get('/mine', protect, authorize('exhibitor'), c.myBooths);

module.exports = router;