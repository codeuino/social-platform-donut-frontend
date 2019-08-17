const express = require('express');
const router = express.Router();
const profileRoutes = require('./profile.routes');
const loginRoutes = require('./login.routes');
const postRoutes = require('./posts.route');
const projectRoutes = require('./projects.routes')
const TodosRoutes = require('./todos.routes')
const EventsRoutes = require('./events.routes')
const passport = require('passport')
const Projects = require('../schema/project')
const Events = require('../schema/events')
const Posts = require('../schema/posts')

//Setting posts route
router.use('/posts',postRoutes)
router.use('/profile', profileRoutes);
router.use('/auth', loginRoutes);
router.use('/projects',projectRoutes)
router.use('/todos',TodosRoutes)
router.use('/events',EventsRoutes)
router.post('/fetchFeed',passport.authenticate('jwt',{session:false}), async (req,res) => {
    var projects = await Projects.find({})
    var posts = await Posts.find({})
    var events = await Events.find({}).populate('organiser')
    var feed = projects.concat(posts,events)
    feed.sort(function (a,b) {
        return a.createdAt < b.createdAt
    })
    res.json({
        status:1,
        feed:feed
    })
})
module.exports = router;
