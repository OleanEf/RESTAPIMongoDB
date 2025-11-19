const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema({
  m_id: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  c_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  cer_start: { type: Date, required: true },
  cer_expire: { type: Date, required: true }
});

module.exports = mongoose.model("Enroll", EnrollSchema);
