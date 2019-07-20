const path = require('path');
const fileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');

const logDir = require('config').get('logger:logDir');

const logger = morgan('common', {
  stream: fileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD-HH',
    filename: path.join(logDir, 'access_%DATE%.log'),
    frequency: '14d',
    max_logs: '20',
    size: '20m',
    verbose: false,
    audit_file: logDir,
  }),
});

module.exports = logger;
