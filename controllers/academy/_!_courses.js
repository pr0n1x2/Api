const TaskModel = require('models/task');
const ModulesUserDataModel = require('models/modulesUserData');

const getTaskList = async () => {
  const data = await TaskModel.find({});
  const tasks = data.map(item => item.toClient());
  return tasks;
};

const getTask = async (id) => {
  const data = await TaskModel.findById(id).exec();
  const task = data.toClient();

  const result = {
    status: 'ok',
    payload: { task },
  };

  return result;
};

const updateTask = async (task) => {
  const { id } = task;
  // eslint-disable-next-line no-param-reassign
  delete task.id;

  await TaskModel.findOneAndUpdate({ _id: id }, task);
};

const createTask = async (task) => {
  const model = new TaskModel(task);
  const { id } = await model.save();
  return id;
};

const getCourse = async (id) => {
  const data = await CourseModel.findById(id).populate('themes').exec();
  const themes = data.themes.map(item => item.toClient());
  const course = {
    ...data.toClient(),
    themes,
  };

  const result = {
    status: 'ok',
    payload: { course },
  };

  return result;
};



const getThemeProgress = async (courseId, themeId, userId) => {
  const theme = await getTheme(courseId, themeId);

  const payload = {};

  const result = {
    status: 'ok',
    payload,
  };

  return result;
};

const applyThemeBlockData = async (courseId, themeId, blockType, data) => {
  const doc = new ModulesUserDataModel();
  doc.course = courseId;
  doc.theme = themeId;
  doc.blockType = blockType;
  doc.data = data;
  doc.save();
};


module.exports.getThemeList = getThemeList;
module.exports.getTaskList = getTaskList;
module.exports.getTask = getTask;
module.exports.updateTask = updateTask;
module.exports.createTask = createTask;
module.exports.getCourse = getCourse;
module.exports.getTheme = getTheme;
module.exports.applyThemeBlockData = applyThemeBlockData;
module.exports.getThemeProgress = getThemeProgress;