const express = require('express');
const router = express.Router();
const profileRoutes = require('./profile.routes');
const loginRoutes = require('./login.routes');
const postRoutes = require('./posts.route');
const projectRoutes = require('./projects.routes')
//Setting posts route
router.use('/posts',postRoutes)
router.use('/profile', profileRoutes);
router.use('/auth', loginRoutes);
router.use('/projects',projectRoutes)
module.exports = router;
