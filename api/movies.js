const omdb = require('./omdb');

function getMovieDetails(title, year, type, plot) {
  return omdb.getMovieDetails(title, year, type, plot)
}

module.exports = {
  getMovieDetails
};
