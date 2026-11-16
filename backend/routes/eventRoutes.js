const router = require('express').Router();
const c = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', c.list);
router.get('/:id', c.getOne);
router.post('/', protect, authorize('admin'), upload.single('banner'), c.create);
router.put('/:id', protect, authorize('admin'), upload.single('banner'), c.update);
router.delete('/:id', protect, authorize('admin'), c.remove);

module.exports = router;