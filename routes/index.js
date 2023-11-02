
const express = require('express');
const router = express.Router();


 router.use('/',require('./home'));
 router.use('/project',require('./project'));
 router.use('/issue',require('./issue'));

 router.use('/api',require('./api/index'));

module.exports=router;