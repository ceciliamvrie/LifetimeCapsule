const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db/config.js');
const User = require('./models/user.js');
const Capsule = require('./models/capsule.js');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use( bodyParser.json() );

app.use(session({ secret: 'no-secret' }));

app.use(express.static('client'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../client/home.html'));
  }
  res.sendFile(path.join(__dirname, '../client/templates/landing.html'));
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
    }
  })
});


app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/create.html'));
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/view.html'));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
