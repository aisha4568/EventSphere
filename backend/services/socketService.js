let io = null;
const userSockets = new Map();

const init = (server) => {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  io.on('connection', (socket) => {
    socket.on('auth', (userId) => {
      userSockets.set(userId, socket.id);
      socket.join(userId);
    });
    socket.on('disconnect', () => {
      for (const [uid, sid] of userSockets.entries()) {
        if (sid === socket.id) userSockets.delete(uid);
      }
    });
  });
  return io;
};

const pushToUser = (userId, event, payload) => {
  if (io) io.to(userId.toString()).emit(event, payload);
};

const notify = async (userId, title, message, type = 'info', link = '') => {
  if (!userId) return;
  try {
    const Notification = require('../models/Notification');
    const doc = await Notification.create({ user: userId, title, message, type, link });
    pushToUser(userId, 'notification:new', doc);
    return doc;
  } catch (err) {
    console.error('notify error:', err.message);
  }
};

module.exports = { init, pushToUser, notify };