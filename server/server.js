const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db/config.js');
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
  console.log(req.body)
  res.sendStatus(200)
})

app.post('/signin', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})


app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/create.html'));
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/view.html'));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
