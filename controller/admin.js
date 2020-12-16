const Post = require('../model/postModel');
const Request = require('../model/requestModel');
const Orgs = require('../model/orgModel')







exports.viewAdmin = async (req, res) => {
  const pending = await Request.find({
    accountStatus: 'pending',
  });

  const approved = await Request.find({
    accountStatus: 'approved',
  });

  const rejected = await Request.find({
    accountStatus: 'rejected',
  });


  res.render('adminPanel', { pending, approved, rejected });
};

exports.requestAdmin = async (req, res) => {
  const status = req.body.submit == 'Approve' ? 'approved' : 'rejected';
    console.log(req.params.id)

  const account = await Request.findByIdAndUpdate(req.params.requestId, {
    accountStatus: status,
  }, {new : true});

await account.save();


const pending = await Request.find({
    accountStatus: 'pending',
  });

  const approved = await Request.find({
    accountStatus: 'approved',
  });

  const rejected = await Request.find({
    accountStatus: 'rejected',
  });


  res.render('adminPanel', { pending, approved, rejected });




};
