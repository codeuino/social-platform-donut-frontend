const Jimp = require('jimp');
module.exports = {
  ppResize: function(img, height, width) {
    let imgDir = './views/uploads/profilePics/' + img;
    Jimp.read(imgDir, (err, img) => {
      if (err) throw err;
      img
        .resize(width, height)
        .quality(60)
        .write(imgDir);
    });
  }
};
