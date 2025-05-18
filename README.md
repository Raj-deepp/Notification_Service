**Notification Service**

A simple and scalable microservice to send **Email**, **SMS**, and **In-App** notifications using **Node.js**, **Express**, and **RabbitMQ**.

---

## 🚀 Features

- REST API to send notifications
- Supports Email, SMS, and In-App types
- Queue-based message processing with RabbitMQ
- Retry mechanism for failed notifications
- Modular service architecture

---

## Assumptions

- SMS sending is stubbed (not integrated with an actual provider like Twilio).
- In-app notifications are stored in memory (no database).
- Email uses a basic SMTP setup (like Gmail SMTP).
- RabbitMQ must be running locally via Docker.