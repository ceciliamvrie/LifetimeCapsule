const mailer = require('nodemailer');
const serviceEmailAddress = 'lifetime.capsule.service@gmail.com';

let transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: serviceEmailAddress,
    pass: 'password4568'
  }
});

let mailOptions = {
  from: serviceEmailAddress,
  subject: 'Lifetime Capsule Unearthed',
};

exports.sendEmail = (recipient, message) => {
  let options = {
    from: mailOptions.from,
    subject: mailOptions.subject,
    to: recipient,
    text: message
  }

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(`ERROR sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
