const express = require('express');
const router = express.Router();

const projectcontroller = require('../controllers/projectcontroller');
 
 
router.get('/createpage',projectcontroller.createpage);

//  router.post('/',projectcontroller.detail);
 router.post('/create',projectcontroller.create);
 router.get('/detail',projectcontroller.detail);
//  router.post('/update',projectcontroller.update);
//  router.post('/delete',projectcontroller.delete);

// router.post('/comment',require('./comment'));

module.exports=router;