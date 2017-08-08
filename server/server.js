const path = require('path');
const express = require('express');
const db = require('./db/config.js');

const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/home.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/create.html'));
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/landing.html'));
});

app.get('/view', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/templates/view.html'));
});

app.get('/capsules', (req, res) => {
  res.send('The capsules will be here');
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
