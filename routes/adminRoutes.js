const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin')



router.get('/', adminController.viewAdmin)
router.post('/:requestId', adminController.requestAdmin)







module.exports = router;