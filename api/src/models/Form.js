const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_type: { type: String },
  text: { type: String },
  options: { type: [String] },
});

const formSchema = new mongoose.Schema({
  form: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
    },
    isPublished: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Form", formSchema);
