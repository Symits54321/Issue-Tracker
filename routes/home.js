const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/homecontroller');

 router.get('/',homecontroller.home);

// router.use('/comment',require('./comment'));

module.exports=router;