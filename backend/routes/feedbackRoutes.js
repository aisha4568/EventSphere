const router = require('express').Router();
const c = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, c.create);
router.get('/mine', protect, c.myFeedback);
router.get('/', protect, authorize('admin'), c.list);
router.put('/:id', protect, authorize('admin'), c.update);

module.exports = router;