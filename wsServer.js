const { logger } = require('logger');
const socketio = require('socket.io');
const origins = require('config').get('server:ws:origins');


module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins(origins);

  io.on('connection', (socket) => {
    logger.debug(`connect: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      logger.debug(`disconnect: ${socket.id} ${reason}`);
    });
  });

  module.exports = io;
  // eslint-disable-next-line global-require
  require('wsRoutes/academy');
  // eslint-disable-next-line global-require
  // require('wsRoutes/tasks');
  // eslint-disable-next-line global-require
  // require('wsRoutes/themes');
};
