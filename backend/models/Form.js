const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  label: String,
  type: { type: String, enum: ['text', 'mcq'] },
  options: [String]
});

const formSchema = new mongoose.Schema({
  title: String,
  questions: [questionSchema],
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publicId: { type: String, unique: true }
});

module.exports = mongoose.model('Form', formSchema);