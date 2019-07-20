const { logger } = require('logger');
const { init } = require('wsServer');

module.exports = async (server) => {
  await init(server);
  logger.info(' - - ws server listening');
};
