const issueApi = require('../../controllers/api/issue_api')

const express = require('express');
const router = express.Router();



 router.get('/filter',issueApi.filter);



module.exports=router;