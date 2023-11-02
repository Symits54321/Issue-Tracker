const mongoose = require('mongoose');


const issueSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true

    },

    label:{
        type:Array,
        required: false
    },
    
    author:{
        type: String,
        required: true
    },
    
    project:{
        type: String,
        required: true
    }
   
},{
    timestamps: true
});

const IssueModel = mongoose.model('Issue_data', issueSchema);

module.exports = IssueModel;