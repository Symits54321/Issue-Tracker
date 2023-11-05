const express = require('express');
const router = express.Router();

const issuecontroller = require('../controllers/issuecontroller');
 

//router.get('/createpage',projectcontroller.createpage);

//  router.post('/',projectcontroller.detail);
 router.post('/create',issuecontroller.create);
 //router.get('/delete/:issueId',issuecontroller.delete);
 //router.get('/detail',projectcontroller.detail);
//  router.post('/update',projectcontroller.update);
//  router.post('/delete',projectcontroller.delete);

// router.post('/comment',require('./comment'));

module.exports=router;