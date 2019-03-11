const express = require('express');

const movies = require('./movies');
const comments = require('./comments');

const router = express.Router();

router.use('/movies', movies);
router.use('/comments', comments);

module.exports = router;
