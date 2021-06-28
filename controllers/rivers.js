const River = require('../models/river');
const Comment = require('../models/comment');

module.exports = {
  index,
  show,
  new: newRiver,
  create
};

function index(req, res) {
  River.find({}, function(err, rivers) {
    res.render('rivers/index', { title: 'All Rivers', rivers });
  });
}

function show(req, res) {
  River.findById(req.params.id)
    .populate('cast')
    .exec(function(err, movie) {
      // Native MongoDB syntax
      Performer
        .find({_id: {$nin: movie.cast}})
        .sort('name').exec(function(err, comments) {
          res.render('rivers/show', { title: 'River Detail', river, comments });
        });
    });
}

function newRiver(req, res) {
  res.render('rivers/new', { title: 'Add River' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const river = new River(req.body);
  river.save(function(err) {
    if (err) return res.redirect('/rivers/new');
    res.redirect(`/rivers/${river._id}`);
  });
}
