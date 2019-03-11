'use strict';

module.exports = {
  port: process.env.PORT || 3333,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost/test",
  omdbKey: process.env.OMDB_KEY || "d4c6e1f0"
};
