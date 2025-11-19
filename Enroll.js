const mongoose = require("mongoose");

const EnrollSchema = new mongoose.Schema(
  {
    cer_id: { type: Number, required: true, unique: true },
    m_id: { type: Number, required: true },
    c_id: { type: Number, required: true },
    cer_start: { type: Date, required: true },
    cer_expire: { type: Date, required: true }
  },
  { versionKey: false }
);

EnrollSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id;

    ret.cer_start = ret.cer_start.toISOString().split("T")[0];
    ret.cer_expire = ret.cer_expire.toISOString().split("T")[0];
    
    return ret;
  }
});

module.exports = mongoose.model("Enroll", EnrollSchema);
