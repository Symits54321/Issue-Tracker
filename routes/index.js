
const express = require('express');
const router = express.Router();


 router.use('/',require('./home'));
 router.use('/project',require('./project'));
// router.use('/issue',require('./issue'));

module.exports=router;