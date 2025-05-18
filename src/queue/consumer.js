const amqp = require('amqplib');
const { sendEmail } = require('../Services/emailService');
const { sendSMS } = require('../Services/smsService');
const { sendInApp } = require('../Services/inAppService');

(async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  const queue = 'notifications';

  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async msg => {
    if (msg !== null) {
      const { type, to, subject, text, userId } = JSON.parse(msg.content.toString());
      try {
        if (type === 'email') await sendEmail(to, subject, text);
        if (type === 'sms') await sendSMS(to, text);
        if (type === 'in-app') sendInApp(userId, text);
        channel.ack(msg);
      } catch (err) {
        console.error('Retrying due to failure:', err.message);
        setTimeout(() => channel.sendToQueue(queue, msg.content), 5000); // retry after 5 sec
        channel.ack(msg); // To avoid infinite loop, ack original msg
      }
    }
  });
})();
