var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const upload = require('./multer');

const localStrategy = require('passport-local');
const post = require('./post');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') }); // Pass the error messages to the login template 
});

router.get('/feed', function (req, res, next) {
  res.render('feed');
});

// GET post creation page
router.post('/upload', isLoggedIn, upload.single('file'), async function (req, res, next) {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    imageText: req.body.filecaption,
    postImage: req.file.filename, // Use the filename from multer
    user: user._id // Store the user's ID
  });

  user.posts.push(post._id); // Add the post ID to the user's posts array
  user.save(); // Save the user with the new post
  res.redirect('/profile');
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate('posts');
  res.render('profile', { user: user });
});

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      }
      )
    })
})

router.post("/login", passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true // Optional: enable flash messages for login failures
}), function (req, res) {
  // This function is intentionally left empty as the authentication is handled by passport
});


router.get('/logout', function (req, res) {
  req.logout(function (err) {
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
