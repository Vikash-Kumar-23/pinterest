var express = require('express');
var router = express.Router();
const userModel = require('./users'); // Assuming you have a user model defined in users.js
const postModel = require('./post'); // Assuming you have a post model defined in posts.js
const passport = require('passport');


const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/feed', function (req, res, next) {
  res.render('feed');
});

// router.get('/profile', isLoggedIn, function (req, res, next) {
//   res.render('profile');
// });

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('profile', { user: req.user }); // Pass the user object to the profile template
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
  failureRedirect: '/login',
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
  res.redirect('/login');
}


module.exports = router;
