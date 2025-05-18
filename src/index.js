const express = require('express');
const app = express();
const { publishToQueue } = require('./queue/producer');
const { getUserNotifications } = require('./Services/inAppService');

app.use(express.json());

app.post('/notifications', async (req, res) => {
  const notification = req.body;
  await publishToQueue('notifications', notification);
  res.status(202).send({ status: 'queued' });
});

app.get('/users/:id/notifications', (req, res) => {
  const userId = req.params.id;
  const notifications = getUserNotifications(userId);
  res.send(notifications);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
