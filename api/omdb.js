const superagent = require('superagent');
const apiKey = require('config').get('omdbKey');

function responseToMovie(response) {
  if (!response.Title || !response.Year || !response.Director) {
    throw {error: new Error('Some required fields not present.'), code: 400}
  }
  return {
    title: response.Title,
    year: response.Year,
    rated: response.Rated,
    director: response.Director
  }
}

function getMovieDetails(title, year, type, plot) {
  let queryParams = {};
  if (title) queryParams.t = title;
  if (year) queryParams.y = year;
  if (type) queryParams.type = type;
  if (plot) queryParams.plot = plot;
  return new Promise((resolve, reject) => {
    superagent.get('http://www.omdbapi.com/').query({
      apikey: apiKey, ...queryParams
    }).end((error, res) => {
      if (error) return reject({error, code: 500});
      let data = res.body;
      if (data.Response === 'False') return reject({error: new Error('Movie with this params not found.'), code: 404});
      resolve(responseToMovie(data))
    })
  });
}

module.exports = {
  getMovieDetails
};
