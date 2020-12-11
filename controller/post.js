const { findById } = require('../model/postModel');
const Post = require('../model/postModel');

exports.createPost = async (req, res, next) => {
  const id = req.user.id;
  let imageList = [];
  if (req.files['imageList'].length > 0) {
    req.files['imageList'].forEach((name) => imageList.push(name.filename));
  }

  const post = new Post({
    User: id,
    Title: req.body.title,
    datePosted: Date.now(),
    profilePic: req.files['imagePost'][0].filename,
    imageList: imageList,
    description: req.body.description,
  });

  await post.save();
  console.log(post);

  // NOT GETTING THE REQUEST FROM MULTIFORM DATA
  // USE MULTER AS MIDDLEWARE IN ROUTES TO FIX

  res.render('post', { post });
};

exports.home = async (req, res, next) => {
  const post = await Post.find();

  res.render('home', { item: post });
};

exports.viewPost = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  res.render('postEdit', { item: post });
};

exports.edittext = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findByIdAndUpdate(postId, {
    Title: req.body.title,
    description: req.body.description,
  }, {new : true});


await post.save()


console.log(post)

res.render('postEdit', {item: post})





};

exports.editprofilepic = async (req, res) => {


  const postId = req.params.postId;

  const post = await Post.findByIdAndUpdate(postId, {
    profilePic: req.file.filename
  }, {new : true});

  await post.save()


  console.log(post.profilePic)
  
  res.render('postEdit', {item: post})
  

};
exports.editimagelist = async (req, res) => {

  const postId = req.params.postId;
  const imageName = req.params.imageName;


  const post = await Post.findByIdAndUpdate(postId, {
    $pull: {"imageList" : imageName} 
  }, {new : true}) 

await post.save()

  res.render('postEdit', {item : post})
};
