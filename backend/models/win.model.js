const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const winSchema = new Schema({
  userId: { type: String, required: true },
  weekId: { type: String, required: true },
  name: { type: String },
  note: { type: String },
  wins: [String],
  unixStamp: { type: Number },
}, {
  timestamps: true,
});

const Win = mongoose.model('Win', winSchema);

module.exports = Win;