const Post = require('../model/postModel');

exports.createPost = async (req, res, next) => {
  const id = req.user.id;

    const post = new Post({
      User: id,
      Title: req.body.title,
      datePosted: Date.now(),
      profilePic: req.file.filename,
      description: req.body.description,
    });

    await post.save();
    console.log(post);


  // NOT GETTING THE REQUEST FROM MULTIFORM DATA
  // USE MULTER AS MIDDLEWARE IN ROUTES TO FIX
  console.log(req.file.filename);

  res.render('post', ({item : req.body, image: req.file.filename}));
};
