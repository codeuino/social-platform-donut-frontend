const mongoose=require('mongoose');
const schema=mongoose.Schema;
const project=new schema({
    pname:{
        type:String
    },
    pid:{
        type:String
    },
    github:{
        type:String
    },
    Lang:{
        type:String
    },
    content:{
        type:String
    },
    upDownVote:{
        type:Map,
        of: String,
    },
    proid:{
        type:Number
    }

});

const proj = mongoose.model('project',project);
module.exports=proj;
