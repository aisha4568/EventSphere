require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { init: initSocket } = require('./services/socketService');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/exhibitors', require('./routes/exhibitorRoutes'));
app.use('/api/booths', require('./routes/boothRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/speakers', require('./routes/speakerRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'EventSphere' }));

// Error handler
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  initSocket(server);
  server.listen(PORT, () => console.log(`🚀 EventSphere API running on port ${PORT}`));
});