//const projectModel=require('../models/project')


 // -----------Start------homepage------------------

 module.exports.home=async function(req,res){
    
    return res.render('home', { title: "IssueTracker",
                                 _para: "Welcome to Issue tracker" });
}
 
            
             
            
