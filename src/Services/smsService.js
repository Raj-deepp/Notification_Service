exports.sendSMS = async (to, text) => {
  console.log(`Sending SMS to ${to}: ${text}`);
  return { status: 'sent' }; // simulate
};
