const { logger } = require('logger');
const io = require('wsServer');
const path = require('path');

const { courses: coursesController } = require('controllers/academy');
const { decode: tokenDecode } = require('controllers/jwt');

const prefix = `api/academy/${path.basename(__filename, '.js')}`;

io.on('connection', (socket) => {
  socket.on(`${prefix}/list`, async (data, cb) => {
    logger.debug(`WS ${socket.id} request course list: `);

    const courses = await coursesController.getList();
    const payload = {
      courses,
    };

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/getById`, async (data, cb) => {
    const { courseId } = data;
    logger.debug(`WS ${socket.id} request course by id: ${courseId}`);

    const result = await coursesController.getById(courseId);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/create`, async (data, cb) => {
    const { payload: course, token } = data;
    logger.debug(`WS ${socket.id} create course`);
    const decodedToken = await tokenDecode(token);
    const { sub: uid } = decodedToken.payload.decoded;

    const result = await coursesController.createOne(course);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });
});
