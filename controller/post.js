const Post = require('../model/postModel');
const fs = require('fs');
const path = require('path');
const Updates = require('../model/updatesModel');






exports.landingViewPost = async (req,res) => {

const id = req.params.postId;


const post = await Post.findById(id);


res.render('donatePost', {item: post, updates: await returnUpdates(id)})


  
}













exports.createPost = async (req, res, next) => {
  const id = req.user.id;
  let imageList = [];
  if (req.files['imageList']) {
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

  res.render('postEdit', {
    item: post,
    updates: await returnUpdates(req.params.postId),
  });
};

exports.edittext = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      Title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  );

  await post.save();

  console.log(post);

  res.render('postEdit', {
    item: post,
    updates: await returnUpdates(req.params.postId),
  });
};

exports.editprofilepic = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      profilePic: req.file.filename,
    },
    { new: true }
  );

  await post.save();

  console.log(post.profilePic);

  try {
    fs.unlinkSync(
      `${path.dirname(require.main.filename)}/public/${req.body.oldimagePost}`
    );
    console.log('Success');
  } catch (err) {
    console.error(err);
  }

  res.render('postEdit', {
    item: post,
    updates: await returnUpdates(req.params.postId),
  });
};

// Delete Image List
exports.editimagelist = async (req, res) => {
  const postId = req.params.postId;
  const imageName = req.params.imageName;

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $pull: { imageList: imageName },
    },
    { new: true }
  );

  await post.save();

  try {
    fs.unlinkSync(`${path.dirname(require.main.filename)}/public/${imageName}`);
    console.log('Success');
  } catch (err) {
    console.error(err);
  }

  res.render('postEdit', {
    item: post,
    updates: await returnUpdates(req.params.postId),
  });
};

exports.addrefpic = async (req, res) => {
  const postId = req.params.postId;

  let imageList = [];
  req.files.forEach((name) => imageList.push(name.filename));

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { imageList: imageList },
    },
    { new: true }
  );

  await post.save();

  console.log(post.imageList);

  res.send(post);
};

exports.addupdates = async (req, res) => {
  console.log(req.files);

  // check if there is image, otherwise return an emptry array
  let imageList = [];
  if (req.files) {
    req.files.forEach((name) => imageList.push(name.filename));
  }

  const updates = await new Updates({
    PostId: req.params.postId,
    datePosted: Date.now(),
    imageList: imageList,
    description: req.body.updateDescription,
  });

  await updates.save();

  res.send('Update Added Successfuly');
};

exports.deleteUpdates = async (req, res) => {
  const update = await Updates.findByIdAndDelete(req.params.updatesId);

  res.send('Update Successfuly Deleted')
};

async function returnPost(id) {
  const post = await Post.findById(id);

  return post;
}

async function returnUpdates(id) {
  const updates = await Updates.find({
    PostId: id,
  });

  return updates;
}
