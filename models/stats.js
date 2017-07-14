const mongoose = require('mongoose');

const statSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  activityId:{
    type: String,
    required: true,
  },
  value:{
    type: Number,
    required: false
  },
  date:{
    type: Date,
    default: Date.now
  }
})

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat
