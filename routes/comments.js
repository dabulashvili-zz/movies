const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const Comment = require('../db/comments');
const Movie = require('../db/movies');
const router = express.Router();

router.get('/', (req, res, next) => {

  let page = parseInt(req.query.page || 1);
  let limit = parseInt(req.query.limit || 10);

  Comment.paginate({}, {page, limit}).then(comments => res.send(comments)).catch(next);
});

router.post('/', (req, res, next) => {
  let {text, author, movie} = req.body;
  if (!text || !author || !movie) return next({error: new Error('Required field is missing.'), code: 400});
  Movie.findById(new ObjectID(movie)).then(movie => {
    if (!movie) return Promise.reject({error: new Error('There is no movie with such ID.'), code: 400})
    return movie
  }).then(() => new Comment(req.body).save()).then(comment => res.send(comment)).catch(next);
});

module.exports = router;
