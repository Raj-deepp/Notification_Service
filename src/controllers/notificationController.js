const { sendToQueue } = require('../../queue/publisher');

const sendNotification = async (req, res) => {
  const { type, to, subject, body } = req.body;

  if (!type || !to || !body) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await sendToQueue({ type, to, subject, body });
    res.status(200).json({ message: 'Notification queued' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to queue notification' });
  }
};

module.exports = { sendNotification };
