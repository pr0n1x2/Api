const winston = require('winston');

const { format } = winston;

const logger = winston.createLogger();

const options = {
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.align(),
    format.simple(),
  ),
};

logger.add(new winston.transports.Console(options));

// for detect log function position
const loggerProxy = new Proxy(logger, {
  get: (loggerTarget, level, context) => {
    // check is log function
    const logFunctsLevel = ['debug', 'info', 'warn', 'error'];
    if (!logFunctsLevel.includes(level)) {
      return Reflect.get(loggerTarget, level, context);
    }

    return (...args) => {
      // is there an Error object in message
      const errObj = args.find(el => el instanceof Error);

      // get stack and caller str
      let callerStr = '';
      if (typeof errObj === 'undefined') {
        const { stack } = new Error();
        callerStr = stack.split('\n')[1];
      } else {
        const { stack } = errObj;
        callerStr = stack.split('\n')[2];
      }

      // parse position and path
      const regExp = /(\S+)\s+(\(.+:\d+:\d+\))/;
      const matchs = callerStr.match(regExp);
      const path = matchs[2];

      args.push(path);
      return loggerTarget.log({
        level,
        message: args,
      });
    };
  },
});

module.exports = loggerProxy;
