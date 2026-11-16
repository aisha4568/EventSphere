const router = require('express').Router();
const c = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.post('/', protect, c.send);
router.get('/inbox', protect, c.inbox);
router.get('/sent', protect, c.sent);
router.get('/recipients', protect, c.recipients);
module.exports = router;