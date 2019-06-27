const mongoose=require('mongoose')
const schema=mongoose.Schema

const social=new schema({
 facebook:{
     type:String
 },
 github:{
    type:String
},
twitter:{
    type:String
}
})
const soci=mongoose.model('social',social)
module.exports=soci