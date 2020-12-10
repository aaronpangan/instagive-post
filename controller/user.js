const { expression } = require('joi');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const Post = require('../model/postModel');



exports.register = async (req, res) => {
  let user = await User.findOne({
    username: req.body.username,
  });

  if (user) return res.status(400).send('Username Already Exist');

  user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  console.log(user);
  res.send(user);
};

exports.login = async (req, res) => {
  if (req.cookies.user)
    return res.render('index', {
      warning: 'You are already login!',
      active: false,
    });

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) return res.status(404).send('CANNOT FIND USERNAME');

  const id = user._id;

  const jwtToken = jwt.sign({ id }, process.env.jwtPrivateKey);

  res.cookie('user', jwtToken, {
    httpOnly: true,
  });

  res.redirect('/user/home');
};

exports.home = async (req, res, next) => {
  
  //res.send(req.user.id);

 
  const post = await Post.find({
    User: req.user.id,

  });


  res.render('postForm', ({item : post}));
 






// Query here to get all user post
};














exports.logout = async (req, res) => {
  if (req.cookies.user)
    return res
      .clearCookie('user')
      .render('index', { warning: 'Logout Successfully', active: true });
  else res.render('index', { warning: 'You are not Logged In', active: false });
};


exports.verifyCookie = (req, res, next) => {
  
  if (req.cookies.user) {
        
    next();}
  else return res.render('index', { warning: 'Login First', active: false });
};

exports.verifyToken = (req, res, next) => {
  try {
    let decode = jwt.verify(req.cookies.user, process.env.jwtPrivateKey);
    //created a new request, to be sent to next()
    req.user = decode;
    next();
  } catch (err) {
    return res.status(404).send('INVALID JWT');
  }
};
