const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const isLoggedIn = require('../config/auth');

router.post('/rivers/:id/comments', isLoggedIn, commentsCtrl.create);
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);
router.get('/comments/:id/edit', isLoggedIn, commentsCtrl.edit);
router.put('/comments/:id', isLoggedIn, commentsCtrl.update);

module.exports = router;