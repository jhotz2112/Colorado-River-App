const express = require('express');
const router = express.Router();
const riversCtrl = require('../controllers/rivers');
const isLoggedIn = require('../config/auth');

router.get('/', riversCtrl.index);
router.get('/new', isLoggedIn, riversCtrl.new);
router.get('/:id', riversCtrl.show);
// router.post('/', isLoggedIn, riversCtrl.create);

module.exports = router;
