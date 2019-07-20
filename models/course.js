const path = require('path');
const mongoose = require('mongoose');
require('models/theme');

const { Schema } = mongoose;
const { Types } = Schema;

const generalSchema = new Schema({
  name: {
    type: Types.String,
    default: '',
  },
  amoid: {
    type: Types.String,
    default: '',
  },
  themes: [{
    type: Types.ObjectId,
    ref: 'theme',
  }],
  courseType: {
    type: Types.String,
    enum: ['skills_academy'],
    default: 'skills_academy',
  },
});

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
