const path = require('path');
const mongoose = require('mongoose');
require('models/task');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const objectivesSchema = new Schema({
  name: { type: String },
});

const checklistSchema = new Schema({
  header: { type: String },
  contents: [ new Schema({
    content: { type: String },
  })],
});

const generalSchema = new Schema({
  name: String,
  objectives: [objectivesSchema],
  tasks: [{ type: ObjectId, ref: 'task' }],
  extra_tasks: [{ type: ObjectId, ref: 'task' }],
  checklist: [checklistSchema],
  dangerlist: [checklistSchema],
  dangerlist_header: String,
  attentions: [{
    icon: { type: String, enum: ['hospital', 'sleep', 'swim'] },
    header: String,
    content: String,
  }],
  desc: {
    type: String,
  },
  filter: {
    years: Number,
    months: Number,
  },
});

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
