const fs = require('fs');
const jwt = require('jsonwebtoken');
const pubKeyPath = require('config').get('auth:keys:pub');

const pubKey = fs.readFileSync(pubKeyPath, 'utf-8');

const decode = token => new Promise((resolve) => {
  jwt.verify(token, pubKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      const result = { status: 'error', payload: { error: err } };
      resolve(result);
      return;
    }

    const result = { status: 'ok', payload: { decoded } };
    resolve(result);
  });
});

module.exports.decode = decode;
