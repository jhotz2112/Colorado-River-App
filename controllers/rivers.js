const { title } = require('process');
const River = require('../models/river');

module.exports = {
    index,
    show,
    new: newRiver,
    create
};

function index(req, res) {
    River.find({}, function (err, rivers) {
        res.render('rivers/index', { title: 'All Rivers', rivers });
    });
}

function show(req, res) {
    River.findById(req.params.id, function (err, river) {
        res.render('rivers/show', { title: 'River Details', river });
    });
}


function newRiver(req, res) {
    let today = new Date();
    today = today.toISOString().slice(0, 10);
    res.render('rivers/new', { title: 'newRiver', today });
}

function create(req, res) {
    const s = req.body.dateVisited;
    req.body.dateVisited = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    req.body.open = !!req.body.open;
    req.body.user = req.user._id
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const river = new River(req.body);
    river.save(function (err) {
        if (err) {
            console.log(err)
            return res.redirect('/rivers/new');
        }
        res.redirect(`/rivers/${river._id}`);
    });
}
