const loggerModule = require('logger');

// Uncatched Promise error
const init = () => {
  process.on('unhandledRejection', (err) => {
    const { logger } = loggerModule;
    logger.error(err);
  });
};

module.exports = init;
