const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bigImg = ['boxes', 'mind', 'sun', ''];

const generalSchema = new Schema({
  typeName: String,
  duration: String,
  header: String,
  img: { type: String, enum: bigImg },
  view: { type: String, required: true },
}, {
  timestamps: true,
});

const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
