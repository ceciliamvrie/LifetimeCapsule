const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db/config.js');
const User = require('./models/user.js');
const Capsule = require('./models/capsule.js');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({ secret: 'no-secret' }));
app.use(express.static('client'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

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
    } else {
      console.log('New user created');
      res.sendStatus(201);
    }
  });
});

app.post('/signin', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  })
});

app.post('/create', (req, res) => {
  let newCapsule = Capsule({
    _user: req.session.user, // ?
    capsuleName: req.body.capsuleName,
    contents: [],
    inProgress: true,
    unearthed: false,
    unearthDate: null
  });

  newCapsule.save((err) => {
    if (err) {
      console.error('Could not create capsule in database:', err);
    } else {
      console.log('New empty capsule created for user ', req.session.user);
      res.sendStatus(201);
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
