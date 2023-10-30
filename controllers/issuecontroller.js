const issueModal = require('../models/issueModel');
//createpage open







module.exports.create=async function(req,res){
    
    console.log(req.body);

    try {
            let issue = await issueModal.create(
                req.body
            );


        }catch(err){

            console.log("Error in creating issue  :- "+err);
        }
}
