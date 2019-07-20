const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId, Mixed } = Schema.Types;

const generalSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  roles: [
    { type: String },
  ],
  children: [{
    birthday: { type: Date }
  }],
  orders: [{
    courseId: { type: ObjectId },
    data: { type: Mixed },
    package: ['one_free', 'pay'],
  }],
});


const modelname = path.basename(__filename, '.js');
const model = mongoose.model(modelname, generalSchema);
module.exports = model;
