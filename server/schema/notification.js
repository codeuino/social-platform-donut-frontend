const mongoose = require('mongoose');
const schema = mongoose.Schema;
const notificationSchema = new schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  upvoteId: {
    type: String
  },
  proid: {
    type: Number
  },
  userid: {
    type: String
  },
  shortinfo:{
    type: String
  }
});

const notification = mongoose.model('notificaiton', notificationSchema);
module.exports = notification;
