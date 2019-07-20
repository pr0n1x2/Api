const winston = require('winston');

const { format } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');
const logDir = require('config').get('logger:logDir');

const logger = winston.createLogger();

const consoleOptions = {
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.align(),
    format.simple(),
  ),
};
logger.add(new winston.transports.Console(consoleOptions));


const logOptions = {
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: logDir,
  filename: 'combined-%DATE%.log',
};

logger.add(new DailyRotateFile(logOptions));

// for detect log function position
const loggerProxy = new Proxy(logger, {
  get: (loggerTarget, level, context) => {
    // check is log function
    if (level === 'debug') {
      return () => {}; // ignore debug for prod
    }

    if (['info', 'warn'].includes(level)) {
      return (...args) => {
        loggerTarget.log({
          level,
          message: args,
        });
      };
    }

    if (level !== 'error') {
      return Reflect.get(loggerTarget, level, context);
    }

    return (...args) => {
      // is there an Error object in message
      const errObj = args.find(el => el instanceof Error);

      if (typeof errObj !== 'undefined') {
        // get stack and caller str
        const { stack } = errObj;
        const callerStr = stack.split('\n')[1];

        // parse position and path
        const regExp = /(\S+)\s+(\(.+:\d+:\d+\))/;
        const matchs = callerStr.match(regExp);
        const path = matchs[2];

        args.push(path);
      }

      console.log(args);
      return loggerTarget.log({
        level,
        message: args,
      });
    };
  },
});

module.exports = loggerProxy;
