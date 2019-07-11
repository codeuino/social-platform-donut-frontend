const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    venue: {
        location:{
            type:String,
            required:true
        },
        time: {
            type:String,
            required:true
        }
    },
    organiser :{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    members: [
        {
            type:Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    stats : {
        going :[
            {
                type: Schema.Types.ObjectId,
                ref:'user'
            }
        ],
        interested :[
            {
                type: Schema.Types.ObjectId,
                ref:'user'
            }
        ]
    },
    description : {
        type:String,
        required:true
    },
    createdAt : {
        type:Date,
        default:Date.now
    }
})

const EventModel = mongoose.model('Event',EventSchema)
module.exports = EventModel