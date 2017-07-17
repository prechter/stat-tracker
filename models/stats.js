const mongoose = require('mongoose');

const statSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Activity
  }
  value:{
    type: Number,
    required: false
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat
