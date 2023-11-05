const issueModal = require('../models/issueModel');

//createpage open

module.exports.create=async function(req,res){
    
    console.log(req.body);

    try {
            let issue = await issueModal.create(
                req.body
            );
            
            res.redirect('back');

        }catch(err){

            console.log("Error in creating issue  :- "+err);
        }
}



module.exports.delete=async function(req,res){

    console.log("issue c delete"+req.params.issueId);

    try {
        const issueId = req.params.issueId;
        const deletedIssue = await issueModal.findByIdAndDelete(issueId);
        res.redirect('back');
      } catch (error) {
        console.error("issue delete error"+error);
      
      }

}