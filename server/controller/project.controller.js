const ProjectModel = require('../schema/project')
const mongoose = require('mongoose')
module.exports = {
    addProject : async (req,res) => {
        res.json({
            msg:'Test',
            data:req.body
        })
        // try {
        //    const Project = await ProjectModel.create({
        //        title:req.body.card_title,
        //        description:req.body.description,
        //        content: req.body.card_text,
        //        lang:req.body.Lang,
        //        authorId: req.user._id,
        //        createdAt : new Date().getDate + "-" + new Date().getMonth + "-" + new Date().getFullYear,
        //        image : req.body.image // Lets keep it as a string for now ! :)
        //    })
        //    res.json({Project,status:1})
        // } catch (err) {
        //     res.status(200).json({err,status:0})
        // }
    }
}