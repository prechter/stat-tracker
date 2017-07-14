const mongoose = require('mongoose');

//Activities schema
const activitySchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true,
  }
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity

//Get activity
module.exports.getActivities = function(callback, limit) {
  Activity.find(callback).limit(limit);
};

//Create new activity
module.exports.addActivity = function(activity, callback) {
  Activity.create(activity, callback);
};

//Show info about activity
module.exports.getActivityById = function(id, callback) {
  Activity.findById(id, callback);
};

//Update activity
module.exports.updateActivity = function(id, activity, options, callback) {
  let query = {id: id};
  let update = {
    name: activity.name
  }
  Activity.findOneAndUpdate(query, update, options, callback);
};

//Delete activity
module.exports.deleteActivity = function(id, callback) {
    let query = {id: id};
  Activity.remove(query, callback);
};

//Add stats to activity
module.exports.addStat = function(id, ????) {
    let query = {id: id};
    let update = {
      stats: activity.stats
    }
};


//Delete stats from activity
