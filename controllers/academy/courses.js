const CourseModel = require('models/course');

const getList = async () => {
  const data = await CourseModel.find({});
  const courses = data.map(item => item.toClient());
  return courses;
};

const getById = async (id) => {
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

const createOne = async (payload) => {
  const model = new CourseModel(payload);
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
module.exports.createOne = createOne;
