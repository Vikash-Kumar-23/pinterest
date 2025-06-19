var express = require('express');
var router = express.Router();
const userModel = require('./users'); // Assuming you have a user model defined in users.js
const postModel = require('./post'); // Assuming you have a post model defined in posts.js
const passport = require('passport');


const localStrategy = require('passport-local');
passport.authenticate(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', { user: req.user });
});

router.post("/register", function (req, res){
  const { username,email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate('local')(req, res, function () {
      res.redirect('/profile');
    }
  )
  })
})

router.post("/login", passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/',
}), function (req, res) {
  // This function is intentionally left empty as the authentication is handled by passport
});


router.get('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  }
);
}
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}






// router.get('/alluserposts', async function (req, res, next) {
//   let user = await userModel.findOne({_id:"6852acc94a244735a658ef8c"}).populate('posts');
//   res.send(user);
// }
// );

// router.get('/create-user', async function (req, res, next) {
//   let createduser = await userModel.create({
//     username: 'john_doe',
//     password: 'password123',
//     dp: 'http://example.com/dp.jpg',
//     email: 'john@gmail.com',
//     fullName: 'John Doe',
//   });
//   res.send(createduser);
// });

// router.get('/create-post', async function (req, res, next) {
//   let createdpost = await postModel.create({
//     postText: "This is a sample post 2",
//     user: "6852acc94a244735a658ef8c" // Replace with a valid user ID
//   });
//   let user = await userModel.findOne({ _id: "6852acc94a244735a658ef8c" }); // Replace with a valid user ID
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("Post created and added to user successfully");
// });

module.exports = router;
