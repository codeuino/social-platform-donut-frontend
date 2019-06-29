const Posts=require('../schema/posts')
const MongoClient=require('mongodb').MongoClient
const {MongoCron}= require('mongodb-cron');
const url=require('../config/db').url
MongoClient.connect(url,{useNewUrlParser:true}).then((mongo)=>{
    const db= mongo.db('donut')
    const collection = db.collection('temp_posts');
    const cron = new MongoCron({
        collection, // a collection where jobs are stored
        onStart: async () => console.log('running'),
        onDocument: async (doc) => {
          console.log('inserted sucessfully')
          const post=new Posts()
          for(x in doc)
          {
              post[x]=doc[x]
          }
          const pst=await post.save()
        }, // triggered on job processing
        onError: async (err) => console.log(err), // triggered on error
      });
      cron.start();
  })
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
    },
    schedule:async(req,res)=>{
        const mongo = await MongoClient.connect(url,{useNewUrlParser:true});
        const db= mongo.db('donut');
        const collection = db.collection('temp_posts');
        const job = await collection.insertOne({
        sleepUntil: new Date(req.body.AtDateTime),
        autoRemove : true,
        ...req.body
});
res.status(200).json({'success':'Post Scheduled'})
    }
}