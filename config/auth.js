const path = require('path');

const env = process.env.NODE_ENV;

const getKeyDir = () => {
  const devKeysDir = path.resolve(__dirname, '../../Auth/keys');
  const envKeysDir = process.env.KEYS_DIR;

  if (env === 'development' && !envKeysDir) {
    console.log('\x1b[43m\x1b[30m You use unsafe security keys for development \x1b[0m');
    return devKeysDir;
  }

  if (!envKeysDir) {
    console.log('\x1b[41m\x1b[30m You use unsafe security keys for development in production! \x1b[0m');
    return devKeysDir;
  }

  return envKeysDir;
};

const keysDir = getKeyDir();

const pubKeyPath = path.resolve(keysDir, 'private.key');

module.exports = {
  auth: {
    keys: {
      pub: pubKeyPath,
    },
  },
};
