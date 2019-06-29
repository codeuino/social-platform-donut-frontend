
const Posts=require('../schema/posts')
const mongo=require('mongodb')
module.exports={
   add: async(req,res)=>{
       const post=new Posts()
       console.log(req.body)
       for(x in req.body)
       {
           post[x]=req.body[x]
       }
        const pst=await post.save()
        res.status(200).json({"success":"Successfully entered"})
    },
    delete:async(req,res)=>{
        var o_id = new mongo.ObjectID(req.body.id);
        console.log(o_id)
        console.log(req.body.id)
        const del= await Posts.remove({_id:req.body.id})
        res.status(200).json({"success":"Successfully deleted"})        
    },
    show:async(req,res)=>{
        const result=await Posts.find({})
        console.log(result)
        res.send(result)
    }
}