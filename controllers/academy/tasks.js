const TaskModel = require('models/task');

const getList = async () => {
  const data = await TaskModel.find({}).select('id header typeName duration createdAt').sort({createdAt: -1});
  const tasks = data.map(item => item.toClient());

  return tasks;
};

const getById = async (taskId) => {
  let result;

  try {
    const data = await TaskModel.findById(taskId).exec();
    const task = data.toClient();

    result = {
      status: 'ok',
      payload: {task},
    };
  } catch (e) {
    result = {
      status: 'error',
    };
  }

  return result;
};

const updateById = async (taskId, payload) => {
  let result;

  try {
    await TaskModel.findOneAndUpdate({_id: taskId}, {$set: payload});

    result = {
      status: 'ok',
    };
  } catch (e) {
    result = {
      status: 'error',
    };
  }

  return result;
};

const createOne = async (payload) => {
  const model = new TaskModel(payload);
  const doc = await model.save();
  const { id } = doc;

  const result = {
    status: 'ok',
    payload: { id },
  };

  return result;
};

module.exports.getList = getList;
module.exports.getById = getById;
module.exports.updateById = updateById;
module.exports.createOne = createOne;
