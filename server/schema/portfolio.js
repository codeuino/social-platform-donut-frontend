const Schema = require('mongoose').Schema;
const PortfolioSchema = new Schema({
  LandingPage: {
    type: Object,
    required: true
  },
  AboutScreen: {
    type: Object,
    required: true
  },
  AboutAdmin: {
    type: Object,
    required: true
  }
});
//Example how portfolio object will look like
// LandingPage: {
//   cover_img: 'https://images.pexels.com/photos/2402955/pexels-photo-2402955.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1064',
//   title: 'Codeuino',
//   profilePicture: 'https://placekitten.com/300/300',
//   tagline: 'TEST tagine here to ensure everything working quite properly, all the  data is getting fetched from the prop',
//   social: {
//     github: 'https://www.google.com',
//     facebook: 'https://wwww.facebook.com'
//   }
// },
// AboutScreen: {
//   images: ['https://placekitten.com/300/300', 'https://placekitten.com/300/300', 'https://placekitten.com/300/300'],
//   description: '<p>Hello world, this a description of my org Ive just created in DONUT. Donut provides such great features for sharing new ideas among employees and building a cool social network among them.</p><ul><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li></ul><p>    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quasi molestiae corporis quidem aliquam veritatis reiciendis nobis dignissimos nam ut quam consequuntur, placeat deleniti deserunt a architecto ex hic</p>' // We can add html in it
// },
// AboutAdmin: {
//   name: 'Jaskirat Singh',
//   profilePic: 'https://placekitten.com/300/300',
//   social: {
//     github: 'https://www.google.com',
//     email: 'https://wwww.facebook.com'
//   },
//   about: '<p>Hello world, this a description of my org Ive just created in DONUT. Donut provides such great features for sharing new ideas among employees and building a cool social network among them.</p>' // We can add html in it
// }
const PortfolioModel = mongoose.model('portfolio', PortfolioSchema);
module.exports = PortfolioModel;
