const express = require('express');
const router = express.Router();
const donateController = require('../controller/donate')







router.post('/:postId', donateController.donate)








module.exports = router