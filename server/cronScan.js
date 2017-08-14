const CronJob = require('cron').CronJob;
const emailService = require('./email.js');
const Capsule = require('./models/capsule.js');

(function() {

  /*
    * This function is fed to the CRON job below, and will perform a scan
    * of the entire capsules table to find capsules whose unearthDates are
    * today or earlier.  It will mark these as unearthed and no longer buried,
    * and will send an email to the user at the provided email address, notifying
    * them of their unearthed capsule.
   */
  const scan = () => {
    Capsule.find()
      .populate('_user')
      .exec((err, capsules) => {
        if (err) console.error(`ERROR: ${err}`);
        else if (!capsules) console.log(`Could not retrieve capsules`);
        else {
          for (let capsule of capsules) {
            let today = new Date();
            if (today >= capsule.unearthDate) {

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
                  console.log('Capsule successfully unearthed');
                }
              });
            }
          }
        }
      });
  }

  // this will run 7 days a week at 8 AM PST
  // if the server ever dies, it will simply restart with the server,
  // so at most one day will be lost, and any capsules that should have been
  // unearthed will simply be unearthed on the next day
  let job = new CronJob({
    cronTime: '00 00 8 * * 0-6',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();
