const router = require('express').Router();
const c = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', c.submit);
router.get('/', protect, authorize('admin'), c.list);
router.post('/subscribe', c.subscribe);

module.exports = router;