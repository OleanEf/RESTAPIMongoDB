const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    m_id: { type: Number, required: true, unique: true },
    m_email: { type: String, required: true },
    m_password: { type: String, required: true },
    m_name: { type: String, required: true }
  },
  { versionKey: false }
);

MemberSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model("Member", MemberSchema);
