const issueModal = require('../../models/issueModel');

module.exports.filter = async function (req, res) {
  console.log(req.query.author);

  // Get a list of unique authors from the issues
  


  let project_id = req.query.project_id; // a string
  let authorarray = req.query.author; // array of authors
  let labelarray = req.query.label; // array of labels
  if (authorarray) {
    const authors = authorarray.split(','); 
  console.log('authorarray:', authors);
  }

  if (labelarray) {
    const labels = labelarray.split(','); 
  console.log('labelarray:', labels);
  }


            try {
                    // Build a filter object based on the query parameters
                    const filter = {
                    project: project_id,
                    };

                    if (authorarray) {
                        const authors = authorarray.split(','); 
                    filter.author = { $in: authors };
                    }

                    if (labelarray) {
                        const labels = labelarray.split(','); 
                    filter.label = { $in: labels };
                    }

                    const issues = await issueModal.find(filter).sort({ createdAt: 1 });
                    const authorsToFilter = [...new Set(issues.map(issue => issue.author))];
                    const labelsToFilter = [...new Set(issues.map(issue => issue.label).flat())];
                    return res.status(200).json({
                    message: "filtered Issue Api",
                    projectID: req.query.project_id,
                    author: req.query.author,
                    label: req.query.label,
                    issue: issues,
                    authorsToFilter:authorsToFilter,
                    labelsToFilter:labelsToFilter,
                    });

            } catch (error) {

                console.error(error);
                return res.status(500).json({
                message: "Internal Server Error",
                });
            }
};


    // let posts = await Post.find({})
    //     .sort('createdAt')
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })



    // return res.json(200, {
    //     message: "List of posts",
    //     posts: posts
    // })
