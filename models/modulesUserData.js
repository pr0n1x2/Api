const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const generalSchema = new Schema({
  // user: {type: ObjectId, ref: 'user'},
  course: { type: ObjectId },
  module: { type: ObjectId },
  blockType: { type: String },
  data: {},
});

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
