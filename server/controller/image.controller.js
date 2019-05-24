const Jimp=require('jimp')

module.exports={
    ppResize:function(img,height,width){
        imgDir="./views/uploads/profilePics/"+img
        console.log(typeof(imgDir))
        Jimp.read(imgDir, (err, img) => {
            if (err) throw err;
            img
              .resize(width,height) 
              .quality(60) 
              .write(imgDir)
          });
        }
}