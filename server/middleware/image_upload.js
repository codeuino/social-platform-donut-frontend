//#TODO:- FILE UPLOAD THROUGH S3 PRESIGNED URLS.

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({storage: storage});
module.exports={
    upload
}
