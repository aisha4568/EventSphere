const router = require('express').Router();
const c = require('../controllers/registrationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('attendee'), c.register);
router.get('/mine', protect, authorize('attendee'), c.myRegistrations);
router.put('/:id/cancel', protect, authorize('attendee'), c.cancel);
router.get('/', protect, authorize('admin'), c.listAll);

module.exports = router;