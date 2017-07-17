const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/stat-tracker');

const Activity = require('./models/activities');
const Stat = require('./models/stats');
const User = require('./models/users');
const routes = require('./routes');

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.use(passport.authenticate('basic', { session: false }));
app.use(bodyParser.json());
app.use(routes);

// app.post('/api/activities', (req, res) =>{
//   Activity.create({

app.listen(3000);
console.log('Running on port 3000');
