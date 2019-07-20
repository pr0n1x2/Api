const commonLogger = require('./transports/common');
const expressLogger = require('./transports/express');

// require('./promiseErrorHook')();

module.exports.express = expressLogger;
module.exports.logger = commonLogger;
