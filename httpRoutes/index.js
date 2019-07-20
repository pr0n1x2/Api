const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', payload: 'Hello! I`m an api server. Read the docs for use' });
});

router.get('/a', (req, res) => {
  res.status(400).send('123');
});

module.exports = router;
