const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    c_id: { type: Number, required: true, unique: true },
    c_name: { type: String, required: true },
    c_description: { type: String, required: true },
    c_price: { type: Number, required: true }
  },
  { versionKey: false }
);

CourseSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model("Course", CourseSchema);
