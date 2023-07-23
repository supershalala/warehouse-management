// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const body = 'testing the new setup ';
const from = process.env.TWILIO_US_NUMBER;
const to = process.env.TWILIO_TEST_RECEIVER_NUMBER;

client.messages
    .create({
        body: body,
        from: from,
        to: to
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
