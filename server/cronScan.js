const CronJob = require('cron').CronJob;
const emailService = require('./email.js');
const Capsule = require('./models/capsule.js');

(function() {
  const scan = () => {
    Capsule.find()
      .populate('_user')
      .exec((err, capsules) => {
        if (err) console.error(`ERROR: ${err}`);
        else if (!capsules) console.log(`Could not retrieve capsules`);
        else {
          for (let capsule of capsules) {
            capsule.unearthed = true;
            capsule.buried = false;
            capsule.save((err) => {
              if (err) console.error(`ERROR: ${err}`);
              else {
                let user = capsule._user.username;
                let email = capsule._user.email;
                let capsuleName = capsule.capsuleName || '(unnamed capsule)';
                let message = `
                  Hello, ${user}!
                  Your capsule (${capsuleName}) is ready for viewing.
                `;

                emailService.sendEmail(email, message);
              }
            });
          }
        }
      });
  }

  let job = new CronJob({
    cronTime: '00 00 8 * * 0-6',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();
