var mongoose = require('mongoose');
var schema = mongoose.Schema;
ObjectId = schema.ObjectId;
var postSchema = new schema({
  user: {
    type: ObjectId
  },
  userName: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  Upvotes: {
    type: Object
  },
  DownVotes: {
    type: Object
  },
  tags: {
    type: Array
  },
  Comments: {
    type: [{ user: ObjectId, content: String }]
  }
});
postSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
const Post = mongoose.model('post', postSchema);
module.exports = Post;
