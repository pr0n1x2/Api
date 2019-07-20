const { logger } = require('logger');

const http = require('http');
const port = require('config').get('server:port');
const expressCallback = require('./expressCallback');

const init = () => new Promise((resolve) => {
  logger.info(' - init http server');

  const server = http.createServer(expressCallback);

  server.on('listening', () => {
    logger.info(` - - http server listening on ${port}`);
    resolve(server);
  });

  server.on('error', (error) => {
    switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-throw-literal
      throw `Port ${port} requiresolve elevated privileges`;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-throw-literal
      throw `Port ${port} is already in use`;
    default:
      throw error;
    }
  });

  server.listen(port);
});

const enableRoutes = () => {
  expressCallback.enableRoutes();
  logger.info(' - enable http routes');
};

module.exports = init;
module.exports.enableRoutes = enableRoutes;
