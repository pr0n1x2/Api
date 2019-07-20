// configs
const env = process.env.NODE_ENV;
const loggerEnabled = require('config').get('logger:enabled');

// transports
const devLogger = require('./dev');
const prodLogger = require('./prod');

let logger = null;
if (loggerEnabled === false) {
  logger = console;
} else if (env === 'development') {
  logger = devLogger;
  logger.debug('dev logger used now');
} else {
  logger = prodLogger;
}

module.exports = logger;
