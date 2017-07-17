const mongoose = require('mongoose');
const User = require('./users')

//Activities schema
const activitySchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity
