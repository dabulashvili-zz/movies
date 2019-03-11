const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const status = require('http-status');

const logger = require('./utils/logger');
const router = require('./routes/index');

require('./db/db');

const app = express();

app.use(logger.expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.use(function errorHandler(err, req, res, next) {

  let code = err.code || status.INTERNAL_SERVER_ERROR;
  let error = err.error || err;
  if (code === status.INTERNAL_SERVER_ERROR)
    logger.error(error);
  res.status(code).send(error.message);
});


module.exports = app;
