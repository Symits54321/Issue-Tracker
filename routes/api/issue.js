const issueApi = require('../../controllers/api/issue_api')

const express = require('express');
const router = express.Router();



 router.get('/filter',issueApi.filter);
 router.get('/delete/:issueId',issueApi.delete);


module.exports=router;