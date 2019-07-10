const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema ({
    title: {
        type:String,
        required:true
    },
    completedAt : {
        type:String,
        default: null
    }
})
const TodoModel = mongoose.model('Todo',TodoSchema)
module.exports=TodoModel