const River = require('../models/river');

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
  River.findById(req.params.id, function(err, river) {
    res.render('rivers/show', { title: 'River Details', river});
  });
}


function newRiver(req, res) {
  res.render('rivers/new', { title: 'Add River' });
}

function create(req, res) {
  req.body.open = !!req.body.open;
  req.body.user = req.user._id
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const river = new River(req.body);
  river.save(function(err) {
    if (err) 
    {
        console.log(err)
    return res.redirect('/rivers/new');
}
    res.redirect(`/rivers/${river._id}`);
  });
}
