const projectModal=require('../models/projectModel');
//createpage open

module.exports.createpage=async function(req,res){
    
    return res.render('CreateProject', { title: "IssueTracker/create",
                                 heading: "Create a new Project" });
}





module.exports.create=async function(req,res){
    
    console.log(req.body);

    try {
        let project = await projectModal.create(
            req.body
        );


    //return res.render('CreateProject', { title: "IssueTracker/create",
                               //  heading: "Create a new Project" });
        }catch(err){

            console.log("Error in creating project :- "+err);
        }
}



module.exports.detail=async function(req,res){
    
    console.log(req.query);
    let id = req.query.id;

    try {
        let project = await projectModal.findOne({ _id: id }); 
   
       

                return res.render('DetailProject', { title: "IssueTracker/detail",
                                            heading: "Welcome to Project Detail Page",
                                            _Project:project });


        }catch(err){
            console.log("Error in finding details/rendering of project")
        }
}