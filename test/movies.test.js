const request = require('supertest');
const mongoose = require('mongoose');
const nock = require('nock');
const app = require('../app');

describe('Test movies api', () => {

  beforeEach(() => {
    nock('http://www.omdbapi.com')
      .get('/').query(text => text.t === 'split')
      .reply(200, {"Title":"Split","Year":"2016","Rated":"PG-13","Released":"20 Jan 2017","Runtime":"117 min","Genre":"Horror, Thriller","Director":"M. Night Shyamalan","Writer":"M. Night Shyamalan","Actors":"James McAvoy, Anya Taylor-Joy, Betty Buckley, Haley Lu Richardson","Plot":"Three girls are kidnapped by a man with a diagnosed 23 distinct personalities. They must try to escape before the apparent emergence of a frightful new 24th.","Language":"English","Country":"USA, Japan","Awards":"8 wins & 19 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BZTJiNGM2NjItNDRiYy00ZjY0LTgwNTItZDBmZGRlODQ4YThkL2ltYWdlXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"77%"},{"Source":"Metacritic","Value":"62/100"}],"Metascore":"62","imdbRating":"7.3","imdbVotes":"330,957","imdbID":"tt4972582","Type":"movie","DVD":"18 Apr 2017","BoxOffice":"$138,120,085","Production":"Universal Pictures","Website":"http://www.splitmovie.com/","Response":"True"})

    nock('http://www.omdbapi.com')
      .get('/').query(text => text.t === 'asdasd')
      .reply(200, {"Response":"False","Error":"Movie not found!"})
  });

  afterAll(async done => {
    await mongoose.connection.db.dropDatabase();
    mongoose.disconnect(done)
  });

  describe('GET /movies', () => {
    test('Should return empty list', async done => {
      const response = await request(app).get('/api/movies');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.limit).toBe(10);
      expect(response.body.page).toBe(1);
      expect(response.body.pages).toBe(1);
      expect(response.body.docs.length).toBe(0);
      done()
    });

    test('Should return non empty list', async done => {
      const movieSaveResponse = await request(app).post('/api/movies').send({
        title: 'split'
      });
      const response = await request(app).get('/api/movies');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.limit).toBe(10);
      expect(response.body.page).toBe(1);
      expect(response.body.pages).toBe(1);
      expect(response.body.docs.length).toBeGreaterThan(0);
      expect(response.body.docs[0].title).toBe('Split');
      done()
    });
  });

  describe('POST /comments', () => {
    test('Should fail on save, missing field', async done => {
      request(app).post('/api/movies').send({
      }).catch(response => {
        expect(response.status).toBe(400);
        done()
      });
    });

    test('Should fail on save, movie not found', async done => {
      request(app).post('/api/movies').send({
        title: 'asdasd'
      }).catch(response => {
        expect(response.status).toBe(404);
        done()
      });
    });

    test('Should save movie', async done => {
      const response = await request(app).post('/api/movies').send({
        title: 'split'
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.title).toBe('Split');
      expect(response.body.year).toBe(2016);
      expect(response.body.rated).toBe("PG-13");
      done()
    });
  })
});
