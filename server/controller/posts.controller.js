const Posts=require('../schema/posts')
const {MongoClient,ObjectId}=require('mongodb')
const {MongoCron}= require('mongodb-cron');
const org = require('../schema/organisation')
const user = require('../schema/user')
const url=require('../config/credential').db
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
    //Adding posts to collection
   add: async(req,res)=>{
       const post=new Posts()
       //Setting parameteres of body to posts
       for(x in req.body)
       {
           post[x]=req.body[x]
       }
       let authorName
        try {
            if(req.user.type===1){
                const User = await org.findById(req.user.id)
                authorName = User.name
                post.userName = authorName
                post.user = req.user.id
            }else {
                const User = await user.findById(req.user.id)
                authorName = User.name
                post.userName = authorName
                post.user = req.user.id
            }
            
            const pst=await post.save()
            res.status(200).json({"success":"Successfully entered"})
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status:0
            })
        }
       
    },
    //Deleting Posts
    delete:async(req,res)=>{
        var o_id = new mongo.ObjectID(req.body.id);
        console.log(o_id)
        console.log(req.body.id)
        //Removing post from collection
        const del= await Posts.remove({_id:req.body.id})
        res.status(200).json({"success":"Successfully deleted"})        
    },
    show:async(req,res)=>{
        //Show all posts inside collection
        const result=await Posts.find({})
        console.log(result)
        res.send(result)
    },
    schedule:async(req,res)=>{
        //Scheduling Post
        const mongo = await MongoClient.connect(url,{useNewUrlParser:true});
        const db= mongo.db('donut');
        const collection = db.collection('temp_posts');
        const job = await collection.insertOne({
            //Time at which post want to be scheduled
        sleepUntil: new Date(req.body.AtDateTime),
        autoRemove : true,
        ...req.body
});
res.status(200).json({'success':'Post Scheduled'})
    },
    update:async(req,res)=>{
        const mongo = await MongoClient.connect(url,{useNewUrlParser:true});
        const db= mongo.db('donut');
        const posts = db.collection('posts');   
        var new_post={}
        for (x in req.body){
            if(x!='updateId'){
                new_post[x]=req.body[x]
            }
        }
        //Updating Post from id
        const result=await posts.update({_id:ObjectId(req.body.updateId)},{$set:{...new_post}})
        console.log(result)
        res.status(200).json({'success':'Post Updated'})
    }
}