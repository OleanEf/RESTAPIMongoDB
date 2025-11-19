const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  c_name: { type: String, required: true },
  c_description: { type: String, required: true },
  c_price: { type: Number, required: true }
});

module.exports = mongoose.model("Course", CourseSchema);
