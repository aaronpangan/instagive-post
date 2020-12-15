const { expression } = require('joi');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const nodemailer = require('nodemailer');

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

// Called by Login
exports.home = async (req, res, next) => {
  //res.send(req.user.id);

  const post = await Post.find({
    User: req.user.id,
  });

  res.render('postForm', { item: post });

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
    next();
  } else return res.render('index', { warning: 'Login First', active: false });
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

exports.renderRequest = async (req, res) => {
  res.render('requestAccount');
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'instagive2021@gmail.com',
    pass: 'Instagivethesis2021',
  },
});

exports.requestAccount = async (req, res) => {
  const {
    email,
    password,
    city,
    region,
    zipcode,
    orgName,
    orgAddress,
    orgNumber,
    repName,
    orgDescriptions,
  } = req.body;

  let documents = [];

  req.files['orgDocuments'].forEach((files) => {
    documents.push(files.filename);
  });

  let docpaths = req.files['orgDocuments'].forEach((files) => {
    return {filename: files.filename, path: files.path}
  });

  const request = await new Request({
    email: email,
    password: password,
    city: city,
    region: region,
    zipcode: zipcode,
    orgName: orgName,
    orgAddress: orgAddress,
    orgPhoto: req.files['orgPhoto'][0].filename,
    orgNumber: orgNumber,
    repName: repName,
    repId: req.files['repId'][0].filename,
    orgDocuments: documents,
    orgDescriptions: orgDescriptions,
  });

  await request.save();

  let mailOptions = {
    from: email,
    to: 'instagive2021@gmail.com',
    subject: 'Test',
    text: orgDescriptions,
    attachments: [
      {
        filename: req.files['orgPhoto'][0].filename,
        path: req.files['orgPhoto'][0].path,
      },
      {filename: req.files['repId'][0].filename, path: req.files['repId'][0].path },
      {docpaths}
   
    ],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('MESSAGE SENT!!');
    }
  });

  res.send(request);
};
