const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const Activity = require('./models/activities');
const Stat = require('./models/stats');
const User = require('./models/users');

//Connect to mongoose
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-tracker');
const db = mongoose.connection; //db object

router.get('/', function(req, res) {
  res.send('Please use /api/activities')
});


//Show a list of all users
router.get('api/users', function(req, res) {
  User.find(function (err, users) {
    if (err) {
      throw err;
    }
    res.json(users);
  })
});

//Create new user
router.post('/api/users', function(req, res) {
  let newUser = new User({
    username: req.body.username
    password: req.body.password
  });
  newUser.save(function(err, newUser) {
    if (err) {
      throw err;
    }
    res.json(newUser);
  })
});

//Show a list of all activities I am tracking, and links to their individual pages
router.get('/api/activities', function(req, res) {
  Activity.find(function(err, activities) {
    if (err) {
      throw err;
    }
    res.json(activities);
  })
});

//Create a new activity for me to track.
router.post('/api/activities', function(req, res) {
  let newActivity = new Activity({
    name: req.body.name
    user: req.user._id
  });
  newActivity.save(function(err, newActivity) {
    if (err) {
      throw err;
    }
    res.json(newActivity);
  });
});

//Show information about one activity I am tracking, and give me the data I have recorded for that activity.
router.get('/api/activities/:_id', function(req, res) {
  Activity.findById({
    _id: req.params._id
  }
   function(err, activity) {
    if (err) {
      throw err;
    }
    res.json(activity);
  })
});

//Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.put('/api/activities/:_id', function(req, res) {
  Activity.update({
    _id: req.params._id
  }),
  { $set: {name: req.body.name} }.exec();
});
//Note: see mongoDB API documentation on updating again if this isn't working...findOneAndUpdate?

//Delete one activity I am tracking. This should remove tracked data for that activity as well.
router.delete('/api/activities/:_id', function(req, res) {
  Activity.find({
    _id: req.params._id,
    user: req.user._id
  }).remove(function(req, res) {
    Stat.find({
      activity: req.params._id
    }).remove(function(err, res) {
      if (err) {
        throw err;
      }
      res.send('Successfully deleted activity and stats.');
    })
  });

//Add stats for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.post('/api/activities/:_id/stats', function(req, res) {
  let newStat = new Stat({
    user: req.user._id,
    activity: req.params._id,
    value: req.params.value,
    date: req.params.date
  });
  newStat.save(function(err, newStat) {
    if (err) {
      throw err;
    }
    res.json(newStat);
  });
});

//Remove stats for a day.
router.delete('/api/stats/:_id', function(req, res) {
  Stat.find({
    activity: req.params._id
  }).remove(function(err, res) {
    if (err) {
      throw err;
    }
    res.send('Successfully deleted stat.');
  })
});

module.exports = router;
