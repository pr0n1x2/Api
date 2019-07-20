const path = require('path');
const fs = require('fs-extra');

const files = fs.readdirSync(__dirname).filter((file) => {
  if (path.extname(file) !== '.js' || path.basename(file) === 'index.js') {
    return false;
  }

  return true;
});

files.forEach((filename) => {
  const filepath = path.resolve(__dirname, filename);
  // eslint-disable-next-line import/no-dynamic-require
  require(filepath);
});
