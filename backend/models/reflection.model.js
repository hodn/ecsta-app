const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reflectionSchema = new Schema({
  userId: { type: String, required: true },
  weekId: { type: String, required: true },
  name: { type: String },
  note: { type: String },
  reflections: { type : Array , "default" : [] },
  unixStamp: { type: Number }
}, {
  timestamps: true,
});

const Reflection = mongoose.model('Reflection', reflectionSchema);

module.exports = Reflection;