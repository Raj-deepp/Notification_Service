require('dotenv').config();

const express = require('express');
const app = express();

const { publishToQueue } = require('./queue/producer');
const { getUserNotifications } = require('./Services/inAppService');

app.use(express.json());

app.post('/notifications', async (req, res) => {
  try {
    const notification = req.body;
    await publishToQueue('notifications', notification);
    res.status(202).send({ status: 'queued' });
  } catch (error) {
    console.error('Error publishing notification:', error);
    res.status(500).send({ error: 'Failed to queue notification' });
  }
});

app.get('/users/:id/notifications', (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = getUserNotifications(userId);
    res.send(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).send({ error: 'Failed to get notifications' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
