const router = require('express').Router();
const c = require('../controllers/exhibitorController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', c.list);
router.get('/me', protect, authorize('exhibitor'), c.getMyProfile);
router.put('/me', protect, authorize('exhibitor'), upload.single('logo'), c.updateMyProfile);
router.get('/applications', protect, authorize('admin'), c.listApplications);
router.get('/applications/mine', protect, authorize('exhibitor'), c.myApplications);
router.post('/applications', protect, authorize('exhibitor'), c.apply);
router.put('/applications/:id', protect, authorize('admin'), c.updateApplication);
router.get('/:id', c.getOne);

module.exports = router;