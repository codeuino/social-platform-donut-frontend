const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: Number, //0 => upcoming, 1 => going on , 2 => done , 3 => cancelled
    default: 0
  },
  attendees: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  venue: {
    location: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },
  members: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  organiserDetails: {
    phone: {
      type: String
    },
    email: {
      type: String
    },
    Type: {
      type: Number
    },
    id: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String
    }
  },
  coverImg: {
    type: String
  }
});

const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
