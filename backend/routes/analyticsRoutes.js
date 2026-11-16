const router = require('express').Router();
const c = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/dashboard', protect, authorize('admin'), c.dashboardStats);
router.get('/booth-occupancy', protect, authorize('admin'), c.boothOccupancy);
router.get('/registrations-by-event', protect, authorize('admin'), c.registrationsByEvent);

module.exports = router;