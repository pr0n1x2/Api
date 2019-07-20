const ThemeModel = require('models/theme');
const ThemeProgressModel = require('models/themeProgress');
const UserModel = require('models/user');

const getList = async () => {
  const data = await ThemeModel.find({});
  const themes = data.map(item => item.toClient());
  return themes;
};

const getById = async (themeId) => {
  const data = await ThemeModel.findById(themeId).populate(['tasks', 'extra_tasks']).exec();

  const objectives = data.objectives.map(item => item.toClient());
  const tasks = data.tasks.map(item => item.toClient());
  // eslint-disable-next-line camelcase
  const extra_tasks = data.extra_tasks.map(item => item.toClient());
  const checklist = data.checklist.map((item) => {
    const contents = item.contents.map(contentItem => contentItem.toClient());

    const checklistData = {
      ...item.toClient(),
      contents,
    }
    return checklistData;
  });

  const dangerlist = data.dangerlist.map((item) => {
    const contents = item.contents.map(contentItem => contentItem.toClient());

    const checklistData = {
      ...item.toClient(),
      contents,
    }
    return checklistData;
  });

  const theme = {
    ...data.toClient(),
    objectives,
    tasks,
    extra_tasks,
    checklist,
    dangerlist,
  };

  const result = {
    status: 'ok',
    payload: { theme },
  };

  return result;
};

const changeProgress = async (query, done) => {
  console.log({ ...query, done });

  await ThemeProgressModel.findOneAndUpdate(
    query,
    { $set: { ...query, done } },
    { upsert: true },
  );

  return { status: 'ok' };
};

const getProgress = async (query) => {
  const data = await ThemeProgressModel.find(query);
  const progress = data.map(item => item.toClient()); 
  const payload = { progress };

  return { status: 'ok', payload };
};

const getPayed = async (query) => {
  const { uid } = query;
  const data = await UserModel.findById(uid);
  const orders = data.orders.map(item => item.toClient());
  const payload = { orders };

  return { status: 'ok', payload };
};

const createOne = async (payload) => {
  const model = new ThemeModel(payload);
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
module.exports.changeProgress = changeProgress;
module.exports.getProgress = getProgress;
module.exports.getPayed = getPayed;
module.exports.createOne = createOne;
