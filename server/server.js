const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db/config.js');
const User = require('./models/user.js');
const Capsule = require('./models/capsule.js');
const session = require('express-session');
const util = require('./utility.js')
const CronJob = require('cron').CronJob;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('client'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.post('/signup', (req, res) => {
  let newUser = User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  // the password will be hashed in the user file before save gets called
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    } else {
      console.log('New user created');
      res.sendStatus(201);
    }
  });
});

app.post('/signin', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.error(`ERROR: ${err}`);
      res.sendStatus(404);
    } else if (!user) {
      console.log(`Could not find user with email ${req.body.email}`);
      res.sendStatus(404);
    } else {
      user.comparePassword(req.body.password, (err, matches) => {
        if (err) {
          console.error(`Signin error: ${err}`)
          res.sendStatus(404);
        } else if (!matches) {
          console.log('Password did not match');
          res.sendStatus(404);
        } else {
          console.log(`Successful user signin for email ${req.body.email}`);
          util.createSession(req, res, user);
          res.send(user._id);
        }
      });
    }
  });
});

app.post('/capsules/all', (req, res) => {
  console.log('req body userId', req.body);
  Capsule.find({ _user: req.body.userId }, (err, capsules) => {
    if (err) {
      console.error(`All capsules retrieval error: ${err}`);
      res.sendStatus(404);
    } else if (!capsules) {
      console.log('Could not retrieve all capsules');
      res.sendStatus(404);
    } else {
      console.log(`Successfully retrieved all capsules for user ${req.body.userId}`);
      res.send(capsules);
    }
  });
});

app.post('/capsules/buried', (req, res) => {
  Capsule.find({ _user: req.body.userId, buried: true }, (err, capsules) => {
    if (err) {
      console.error(`Buried capsules retrieval error: ${err}`);
      res.sendStatus(404);
    } else if (!capsules) {
      console.log('Could not retrieve buried capsules');
      res.sendStatus(404);
    } else {
      console.log(`Successfully retrieved buried capsules for user ${req.body.userId}`);
      res.send(capsules);
    }
  });
});

app.post('/capsules/inProgress', (req, res) => {
  Capsule.find({ _user: req.body.userId, buried: false }, (err, capsules) => {
    if (err) {
      console.error(`In progress capsules retrieval error: ${err}`);
      res.sendStatus(404);
    } else if (!capsules) {
      console.log('Could not retrieve in progress capsules');
      res.sendStatus(404);
    } else {
      console.log(`Successfully retrieved in progress capsules for user ${req.body.userId}`);
      res.send(capsules);
    }
  });
});

app.post('/create', (req, res) => {
  let newCapsule = Capsule({
    _user: req.body.userId,
    capsuleName: '',
    contents: [],
    buried: false,
    unearthed: false,
    unearthDate: null,
    createdAt: Date.now()
  });

  newCapsule.save((err) => {
    if (err) {
      console.error(`ERROR creating capsule in database: ${err}`)
    } else {
      console.log(`New empty capsule created for user ${req.body.userId}`);
      res.send(newCapsule._id);
    }
  });
});

app.put('/edit', (req, res) => {
  let capsuleId = req.body.capsuleId;
  let newContents = req.body.capsuleContent;
  console.log('server capsuleId', capsuleId)
  Capsule.findOne({ _id: capsuleId }, (err, capsule) => {
    if (err) {
      console.error(`ERROR: ${err}`);
      res.sendStatus(404);
    } else if (!capsule) {
      console.log(`Could not find capsule with id ${capsuleId}`);
      res.sendStatus(404);
    } else {
      capsule.contents = newContents;
      capsule.save((err) => {
        if (err) {
          console.error(`ERROR editing capsule ${capsuleId}: ${err}`);
          res.sendStatus(504);
        } else {
          console.log(`Capsule ${capsuleId} successfully edited`);
          res.sendStatus(200);
        }
      });
    }
  });
});

app.put('/bury', (req, res) => {
  let capsuleId = req.body.capsuleId;
  let unearthDate = req.body.unearthDate;

  Capsule.findOne({ _id: capsuleId }, (err, capsule) => {
    if (err) {
      console.error(`ERROR: ${err}`);
      res.sendStatus(404);
    } else if (!capsule) {
      console.log(`Could not find capsule with id ${capsuleId}`);
      res.sendStatus(404);
    } else {
      capsule.buried = true;
      capsule.unearthDate = util.parseDate(unearthDate);

      capsule.save((err) => {
        if (err) {
          console.error(`ERROR burying capsule ${capsuleId}: ${err}`);
          res.sendStatus(504);
        } else {
          console.log(`Capsule ${capsuleId} successfully buried`);
          res.sendStatus(200);
        }
      });

      /*
      The first anonymous function will execute once when the specified
      capsule.unearthDate is reached.

      The second anonymous function will execute when the job stops.

      The third parameter true tells the job to start right now.
       */
      let job = new CronJob(capsule.unearthDate, () => {

        capsule.unearthed = true;
        capsule.buried = false;

        capsule.save((err) => {
          if (err) {
            console.error(`ERROR modifying capsule properties on completion of CRON job: ${err}`);
          } else {
            console.log(`Capsule ${capsule._id} successfully unearthed`);
          }
        });

      }, () => {
        console.log(`CRON job for ${capsuleId} ended`);
      }, true);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
