const log4js = require('log4js');

log4js.configure({
  appenders: {
    default: {type: 'console'}
  },
  categories: {
    default: {appenders: ['default'], level: process.env.NODE_ENV === 'test' ? 'fatal' : 'info'}
  }
});

const logger = log4js.getLogger();
global.logger = logger;
module.exports = logger;
module.exports.expressLogger = log4js.connectLogger(logger, {
  level: 'auto',
  format: ':method :url -> :status in :response-timems'
});
