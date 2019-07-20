const { logger } = require('logger');
const io = require('wsServer');
const path = require('path');

const { themes: themesController } = require('controllers/academy');
const { decode: tokenDecode } = require('controllers/jwt');

const prefix = `api/academy/${path.basename(__filename, '.js')}`;

io.on('connection', (socket) => {
  socket.on(`${prefix}/list`, async (data, cb) => {
    logger.debug(`WS ${socket.id} request theme list: `);

    const themes = await themesController.getList();
    const payload = {
      themes,
    };

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/getById`, async (data, cb) => {
    const { themeId } = data;
    logger.debug(`WS ${socket.id} request theme ${themeId}: `);

    const result = await themesController.getById(themeId);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/changeProgress`, async (data, cb) => {
    const {
      courseId, themeId, id, field, done, token,
    } = data;
    logger.debug(`WS ${socket.id} request changeProgress`);

    // console.log(courseId, themeId, id, field, done);

    const decodedToken = await tokenDecode(token);
    const { sub: uid } = decodedToken.payload.decoded;

    const query = {
      courseId, themeId, id, field, uid,
    };

    const result = await themesController.changeProgress(query, done);
    const { status } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok' });
  });

  socket.on(`${prefix}/getSelfProgress`, async (data, cb) => {
    const { token } = data;

    logger.debug(`WS ${socket.id} request changeProgress`);

    const decodedToken = await tokenDecode(token);
    const { sub: uid } = decodedToken.payload.decoded;

    const query = { uid };

    // eslint-disable-next-line no-restricted-syntax
    for (const key of ['courseId', 'themeId', 'id', 'field']) {
      if (data.query[key]) {
        query[key] = data.query[key];
      }
    }

    const result = await themesController.getProgress(query);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/getPayed`, async (data, cb) => {
    const { token, themeId } = data;

    logger.debug(`WS ${socket.id} request check pay`);

    const decodedToken = await tokenDecode(token);
    const { sub: uid } = decodedToken.payload.decoded;

    const query = { themeId, uid };
    const result = await themesController.getPayed(query);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/create`, async (data, cb) => {
    const { payload: theme, token } = data;
    logger.debug(`WS ${socket.id} create theme`);
    const decodedToken = await tokenDecode(token);
    const { sub: uid } = decodedToken.payload.decoded;

    const result = await themesController.createOne(theme);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });

  //   socket.on(`api/${prefix}/update`, async (data, cb) => {
  //     const { id } = data;
  //     logger.debug(`WS ${socket.id} update theme ${id}: `);

//     await coursesController.updateTheme(data);
//     cb({ status: 'ok' });
//   });
});
