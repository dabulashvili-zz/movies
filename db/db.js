const mongoose = require('mongoose');
const mongoUri = require('config').get('mongoUri');
const logger = require('../utils/logger');

mongoose.connect(mongoUri, {useNewUrlParser: true}).then(function () {
  logger.info('Connected to DB')
}).catch(function (err) {
  logger.error(err)
});
// mongoose.set('debug', true);

module.exports = mongoose;
