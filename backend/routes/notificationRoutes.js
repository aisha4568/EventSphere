const router = require('express').Router();
const c = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, c.mine);
router.put('/:id/read', protect, c.markRead);
router.put('/read-all', protect, c.markAllRead);
router.delete('/:id', protect, c.remove);
module.exports = router;