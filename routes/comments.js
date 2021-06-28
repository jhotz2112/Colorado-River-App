const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const isLoggedIn = require('../config/auth');

router.post('/rivers/:id/comments', isLoggedIn, reviewsCtrl.create);
router.delete('/comments/:id', isLoggedIn, reviewsCtrl.delete);

module.exports = router;