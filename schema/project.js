var mongoose = require('mongoose');
var schema = mongoose.Schema;

var project = new schema({
  pname: {
    type: String
  },
  pid: {
    type: String
  },
  github: {
    type: String
  },
  Lang: {
    type: String
  },
  content: {
    type: String
  },
  upvote: {
    type: [String]
  },
  downvote: {
    type: [String]
  },
  proid: {
    type: Number
  }
});

const proj = mongoose.model('project', project);
module.exports = proj;
