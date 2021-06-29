const River = require('../models/river');

module.exports = {
    create,
    delete: deleteComment,
    edit,
    update
};

function update(req, res) {
    console.log("hello")
    River.findOne({ 'comments._id': req.params.id }, function (err, river) {
        const commentSubdoc = river.comments.id(req.params.id);
        if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/rivers`);
        commentSubdoc.content = req.body.content;
        river.save(function (err) {
            res.redirect(`/rivers/${river._id}`);
        });
    });
}

function edit(req, res) {
    River.findOne({ _id: req.params.id, user: req.user._id }, function (err, river) {
        if (err || !river) return res.redirect('/rivers');
        res.render('/rivers', { river });
    });
}

async function deleteComment(req, res) {
    const river = await River.findOne({ 'comments._id': req.params.id });
    const comment = river.comments.id(req.params.id);
    if (!comment.user.equals(req.user._id)) return res.redirect(`/rivers/${river._id}`);
    comment.remove();
    await river.save();
    res.redirect(`/rivers/${river._id}`);
}

function create(req, res) {
    River.findById(req.params.id, function (err, river) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // Push the subdoc for the review
        river.comments.push(req.body);
        // Always save the top-level document (not subdocs)
        river.save(function (err) {
            res.redirect(`/rivers/${river._id}`);
        });
    });
}