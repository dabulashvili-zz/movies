const express = require('express');

const Movie = require('../db/movies');
const moviesApi = require('../api/movies');
const router = express.Router();

router.get('/', (req, res, next) => {

  let page = parseInt(req.query.page || 1);
  let limit = parseInt(req.query.limit || 10);

  Movie.paginate({}, {page, limit}).then(movies => res.send(movies)).catch(next);
});

router.post('/', (req, res, next) => {
  let {title, year, type, plot} = req.body;
  if (!title) return next({error: new Error('Required search field is missing.'), code: 400});
  moviesApi.getMovieDetails(title, year, type, plot)
    .then(movie => (new Movie(movie)).save())
    .then(movie => res.send(movie)).catch(next);
});

module.exports = router;
