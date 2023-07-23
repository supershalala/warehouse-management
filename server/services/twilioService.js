const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


function sendSMS(body, from, to) {
  client.messages.create({
    body: body,
    from: from,
    to: to
  })
  .then(message => console.log(message.sid))
  .catch(err => console.error(err));
}

module.exports = sendSMS;
