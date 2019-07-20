// configs
const env = process.env.NODE_ENV;

// transports
const devLogger = require('./dev');
const prodLogger = require('./prod');

let logger = null;
if (env === 'development') {
  logger = devLogger;
} else {
  logger = prodLogger;
}

module.exports = logger;
