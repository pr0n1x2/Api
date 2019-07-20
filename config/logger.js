const path = require('path');

const enabled = process.env.logger !== 'off';
const logDir = path.resolve('./logs');

module.exports = {
  logger: {
    enabled,
    logDir,
  },
};
