const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weekSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String },
  goals: [String],
  note: { type: String },
  unixStamp: { type: Number }
}, {
  timestamps: true,
});

const WeekSchema = mongoose.model('Week', weekSchema);

module.exports = WeekSchema;