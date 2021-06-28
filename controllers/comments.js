const river = require('../models/river');
const Comment = require('../models/river');

module.exports = {
  create,
  delete: deleteComment
};

async function deleteComment(req, res) {
  const movie = await River.findOne({'comments._id': req.params.id});
  // Want to ensure that the review was
  // created by the currently logged in user
  // before we remove it
  const comment = river.comments.id(req.params.id);
  if (!comment.user.equals(req.user._id)) return res.redirect(`/rivers/${river._id}`);
  review.remove();
  // Save the updated movie
  await river.save();
  res.redirect(`/rivers/${river._id}`);
}

function create(req, res) {
  // Find the movie to embed the review within
  River.findById(req.params.id, function(err, river) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    movie.comments.push(req.body);
    // Always save the top-level document (not subdocs)
    river.save(function(err) {
      res.redirect(`/rivers/${river._id}`);
    });
  });
}