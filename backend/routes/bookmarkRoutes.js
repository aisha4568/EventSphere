const router = require('express').Router();
const c = require('../controllers/bookmarkController');
const { protect } = require('../middleware/auth');

router.post('/toggle', protect, c.toggle);
router.get('/mine', protect, c.mine);

module.exports = router;