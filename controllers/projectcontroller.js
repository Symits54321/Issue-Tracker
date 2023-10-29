
//createpage open

module.exports.createpage=async function(req,res){
    
    return res.render('CreateProject', { title: "IssueTracker/create",
                                 heading: "Create a new Project" });
}