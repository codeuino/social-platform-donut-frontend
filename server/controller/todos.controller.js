const TodoModel = require('../schema/Todo')
const UserModel = require('../schema/user')
const OrgModel = require('../schema/organisation')
module.exports= {
    // We can use _id for fetching and adding TODO but neeed a client based uuid for manipualting one
    addTodo:async function(req,res) {
        // First let's create a todo and save it
        const todo = await TodoModel.create({title: req.body.title, id : req.body.id})
        if(req.user.type===1) {
            //it's a org
            try {
                const user = await OrgModel.findByIdAndUpdate(req.user.id, {
                    $push : {
                        'Todos' : todo._id
                    }
                })
                res.json({
                    status:1,
                    msg:'Success'
                })
            } catch (err) {
                res.status(400).json({
                    status:0,
                    msg:'Fail To Add Todo'
                })
            }
            
        } else {
            try {
                const user = await UserModel.findByIdAndUpdate(req.user.id, {
                    $push : {
                        'Todos' : todo._id
                    }
                })
                res.json({
                    status:1,
                    msg:'Success'
                })
            } catch (err) {
                res.status(400).json({
                    status:0,
                    msg:'Fail To Add Todo'
                })
            }
        }
    },
    completeTodo :async function(req,res) {
        try {
            await TodoModel.findOneAndUpdate({id:req.body.id}, {
                $set : {
                    'completedAt' : new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()
                }
            })
            res.json({
                status:1,
                msg:'Success'
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                status:0,
                msg:'Failure'
            })
        }
    },
    deleteTodo : async function (req,res) {
        try {
            console.log(req.body.id)
            const delTodo = await TodoModel.findOneAndDelete({id:req.body.id})
            console.log(delTodo)
            console.log('Todo Deleted')
            if(req.user.type===1) {
                //it's a org
                try {
                    const user = await OrgModel.findOneAndUpdate({_id:req.user.id}, {
                        $pull : {
                            'Todos' : delTodo._id
                        }
                    })
                    res.json({
                        status:1,
                        msg:'Success'
                    })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({
                        status:0,
                        msg:'Fail To Delete Todo'
                    })
                }
                
            } else {
                try {  
                    const user = await UserModel.findOneAndUpdate({_id:req.user.id}, {
                        $pull : {
                            'Todos' : delTodo._id
                        }
                    })
                    res.json({
                        status:1,
                        msg:'Success'
                    })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({
                        status:0,
                        msg:'Fail To Add Todo'
                    })
                }
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                status:0,
                msg:'Fail To Delete Todo'
            })
        }
        
    },
    getTodos : async function(req,res) {
        let todos=[]
        console.log(req.user)
        if(req.user.type === 1) {
            //it's a org
                try {
                    OrgModel.findById(req.user.id)
                    .populate('Todos')
                    .exec((err,doc)=> {
                        if(err){
                            console.log(err)
                            res.status(400).json({
                                status:0,
                                msg:'Fail To fetch Todo'
                            })
                        }else {
                            res.json({
                                status:1,
                                todos:doc.Todos
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                    res.json({
                        status:0,
                    })
                }
            
        }else {
                try {
                    UserModel.findById(req.user.id)
                    .populate('Todos')
                    .exec(function(err,doc) {
                        if(err){
                            console.log(err)
                            res.status(400).json({
                                status:0,
                                msg:'Fail To fetch Todo'
                            })
                        }else {
                            res.json({
                                status:1,
                                todos:doc.Todos
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                    res.json({
                        status:0,
                    })
                }
            
        }
    }
}