const inAppDB = [];

exports.sendInApp = (userId, message) => {
  inAppDB.push({ userId, message, timestamp: Date.now() });
  return { status: 'stored', message };
};

exports.getUserNotifications = (userId) => {
  return inAppDB.filter(n => n.userId === userId);
};
