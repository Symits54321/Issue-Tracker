const projectModal=require('../models/projectModel');


 // -----------Start------homepage------------------

 module.exports.home=async function(req,res){

   const projects=await projectModal.find({});
    
    return res.render('home', { title: "IssueTracker",
                                 _para: "Welcome to Issue tracker",
                                 _Projects:projects
                               });
}
 
            
             
            
