const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
  endpoint: {
    type: String,
  },
  expirationTime: {
    type: String,
    default: null
  },
  keys: {
    p256dh: {
      type: String
    },
    auth: {
      type: String
    }
  }
})
const SubscriptionModel = mongoose.model('subscription', SubscriptionSchema)
module.exports = SubscriptionModel
