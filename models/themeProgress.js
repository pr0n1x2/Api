const path = require('path');
const mongoose = require('mongoose');
require('models/task');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const generalSchema = new Schema({
  courseId: { type: ObjectId },
  themeId: { type: ObjectId },
  id: { type: ObjectId },
  field: { type: String },
  uid: { type: ObjectId },
  done: { type: Boolean },
});

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
