const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activities');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to mongoose
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-tracker');
const db = mongoose.connection; //db object

app.get('/', function(req, res) {
  res.send('Please use /api/activities')
});

//Show a list of all activities I am tracking, and links to their individual pages
app.get('/api/activities', function(req, res) {
  Activity.getActivities(function(err, activities) {
    if(err){
      throw err;
    }
    // res.json(activities);
    res.json({message: 'everything is working!'}); //test
  })
});

//Create a new activity for me to track.
app.post('/api/activities', function(req, res) {
  let activity = req.body;
  Activity.addActivity(activity, function(err, activity) {
    if(err){
      throw err;
    }
    res.json(activity);
  })
});

//Show information about one activity I am tracking, and give me the data I have recorded for that activity.
app.get('/api/activities/:id', function(req, res) {
  Activity.getActivityById(req.params.id, function(err, activity) {
    if(err){
      throw err;
    }
    res.json(activity);
  })
});

//Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
app.put('/api/activities/:id', function(req, res) {
  let id = req.params.id;
  let activity = req.body;
  Activity.updateActivity(id, activity, {}, function(err, activity) {
    if(err){
      throw err;
    }
    res.json(activity);
  })
});

//Delete one activity I am tracking. This should remove tracked data for that activity as well.
app.delete('/api/activities/:id', function(req, res) {
  let activity = req.body;
  Activity.deleteActivity(id, function(err, activity) {
    if(err){
      throw err;
    }
    res.json(activity);
  })
});

//Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
app.post('/api/activities/:id/stats', function(req, res) {
  // let id = req.params.id;
  let stats = req.body;
  Activity.getActivityById(id, function(err, activity) {
    if(err){
      throw err;
    }
  
});

//Remove tracked data for a day.
app.delete('/api/stats/:id', function(req, res){

});


app.listen(3000);
console.log('Running on port 3000');
