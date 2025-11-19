const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  m_email: { type: String, required: true },
  m_password: { type: String, required: true },
  m_name: { type: String, required: true }
});

module.exports = mongoose.model("Member", MemberSchema);
