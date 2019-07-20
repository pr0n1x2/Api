const { logger } = require('logger');
const io = require('wsServer');
const path = require('path');

const { tasks: tasksController } = require('controllers/academy');
const { decode: tokenDecode } = require('controllers/jwt');

const prefix = `api/academy/${path.basename(__filename, '.js')}`;

io.on('connection', (socket) => {
  socket.on(`${prefix}/list`, async (data, cb) => {
    logger.debug(`WS ${socket.id} request task list: `);

    const tasks = await tasksController.getList();
    const payload = {
      tasks,
    };

    cb({ status: 'ok', payload });
  });

  socket.on(`${prefix}/getById`, async (data, cb) => {
    const { taskId } = data;
    logger.debug(`WS ${socket.id} request task ${taskId}: `);

    const result = await tasksController.getById(taskId);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });


  socket.on(`${prefix}/updateById`, async (data, cb) => {
    const { taskId, token, payload } = data;
    logger.debug(`WS ${socket.id} update task ${taskId}: `);
    const decodedToken = await tokenDecode(token);
    // console.log(decodedToken.payload.decoded);
    // const { sub: uid } = decodedToken.payload.decoded;

    const result = await tasksController.updateById(taskId, payload);
    const { status } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok' });
  });


  socket.on(`${prefix}/create`, async (data, cb) => {
    const { payload: task, token } = data;
    logger.debug(`WS ${socket.id} create task`);
    const decodedToken = await tokenDecode(token);
    // const { sub: uid } = decodedToken.payload.decoded;

    const result = await tasksController.createOne(task);
    const { status, payload } = result;

    if (status !== 'ok') {
      cb({ status: 'error' });
      return;
    }

    cb({ status: 'ok', payload });
  });
});

//   socket.on(`api/${prefix}/list`, async (data, cb) => {
//     logger.debug(`WS ${socket.id} request task list: `);

//     const tasks = await coursesController.getTaskList();
//     const payload = {
//       tasks,
//     };

//     cb({ status: 'ok', payload });
//   });

//   socket.on(`api/${prefix}/get`, async (data, cb) => {
//     const { id } = data;
//     logger.debug(`WS ${socket.id} request task ${id}: `);

//     const result = await coursesController.getTask(id);
//     const { status, payload } = result;

//     cb({ status: 'ok', payload });
//   });

//   socket.on(`api/${prefix}/update`, async (data, cb) => {
//     const { id } = data;
//     logger.debug(`WS ${socket.id} update task ${id}: `);

//     await coursesController.updateTask(data);
//     cb({ status: 'ok' });
//   });
