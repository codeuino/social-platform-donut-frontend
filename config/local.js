const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../schema/user');
const multer=require('multer')
const path=require('path')
//MULTER 
const storage=multer.diskStorage({
  destination:'./public/uploads',
  filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter:function(req,res,cb){
    checkFileType(file,cb);
  }
}).single('myImage')

function checkFileType(file,cb){
  const fileTypes=/jpeg|jpg|png|gif/;
  const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype=fileTypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  }else{
    cb('Error:Images only')
  }
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(
  'local.SignUp',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pass',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false);
        }
        
        upload(req,res,(err)=>{
          if(err){
            let img=oldMan.jpeg
          }else{
            let img=req.file.filename
          }
        })
        let newUser = new User();
        newUser.fname = req.body.fname;
        newUser.lname = req.body.lname;
        newUser.email = req.body.email;
        newUser.dob = req.body.dob;
        newUser.github = req.body.github;
        newUser.username = req.body.username;
        newUser.pass = req.body.pass;
        newUser.follower = 0;
        newUser.following = 0;
        newUser.status = 'idle';
        newUser.Eid = newUser.id;
        newUser.profilePicture=img;

        newUser.save(err => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  'local.LogIn',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pass',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.pass != password) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);
