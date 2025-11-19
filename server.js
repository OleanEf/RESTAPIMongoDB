const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const Member = require("./models/Member");
const Course = require("./models/Course");
const Enroll = require("./models/Enroll");

const app = express();
const PORT = 3000;

console.log("🚀 Starting server.js...");

app.use(cors());
app.use(express.json());

connectDB();

async function getNextId(Model, idField) {
  const doc = await Model.findOne().sort({ [idField]: -1 }).select(idField);
  return doc ? doc[idField] + 1 : 1;
}

// MEMBERS

// GET /members
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// POST /members
app.post("/members", async (req, res) => {
  try {
    const { m_email, m_password, m_name } = req.body;
    if (!m_email || !m_password || !m_name)
      return res.status(400).json({ message: "Missing fields" });

    const m_id = await getNextId(Member, "m_id");

    await Member.create({
      m_id,
      m_email,
      m_password,
      m_name
    });

    res.status(201).json({ m_id });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// GET /members/:m_id
app.get("/members/:m_id", async (req, res) => {
  try {
    const m_id = Number(req.params.m_id);
    const member = await Member.findOne({ m_id });
    if (!member) return res.sendStatus(404);
    res.json(member);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// PUT /members/:m_id
app.put("/members/:m_id", async (req, res) => {
  try {
    const m_id = Number(req.params.m_id);
    const { m_email, m_password, m_name } = req.body;

    if (!m_email || !m_password || !m_name)
      return res.status(400).json({ message: "Missing fields" });

    const updated = await Member.findOneAndUpdate(
      { m_id },
      { m_email, m_password, m_name },
      { new: true }
    );

    if (!updated) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// DELETE /members/:m_id
app.delete("/members/:m_id", async (req, res) => {
  try {
    const m_id = Number(req.params.m_id);
    const deleted = await Member.findOneAndDelete({ m_id });
    if (!deleted) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// COURSES

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/courses", async (req, res) => {
  try {
    const { c_name, c_description, c_price } = req.body;
    if (!c_name || !c_description || c_price === undefined)
      return res.status(400).json({ message: "Missing fields" });

    const c_id = await getNextId(Course, "c_id");

    await Course.create({
      c_id,
      c_name,
      c_description,
      c_price
    });

    res.status(201).json({ c_id });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.get("/courses/:c_id", async (req, res) => {
  try {
    const c_id = Number(req.params.c_id);
    const course = await Course.findOne({ c_id });
    if (!course) return res.sendStatus(404);
    res.json(course);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.put("/courses/:c_id", async (req, res) => {
  try {
    const c_id = Number(req.params.c_id);
    const { c_name, c_description, c_price } = req.body;

    if (!c_name || !c_description || c_price === undefined)
      return res.status(400).json({ message: "Missing fields" });

    const updated = await Course.findOneAndUpdate(
      { c_id },
      { c_name, c_description, c_price },
      { new: true }
    );

    if (!updated) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.delete("/courses/:c_id", async (req, res) => {
  try {
    const c_id = Number(req.params.c_id);
    const deleted = await Course.findOneAndDelete({ c_id });
    if (!deleted) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});


// ENROLLS

app.get("/enrolls", async (req, res) => {
  try {
    const enrolls = await Enroll.find();
    res.json(enrolls);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/enrolls", async (req, res) => {
  try {
    const { m_id, c_id, cer_start, cer_expire } = req.body;

    if (!m_id || !c_id || !cer_start || !cer_expire)
      return res.status(400).json({ message: "Missing fields" });

    const cer_id = await getNextId(Enroll, "cer_id");

    await Enroll.create({
      cer_id,
      m_id,
      c_id,
      cer_start,
      cer_expire
    });

    res.status(201).json({ cer_id });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.get("/enrolls/:cer_id", async (req, res) => {
  try {
    const cer_id = Number(req.params.cer_id);
    const enroll = await Enroll.findOne({ cer_id });
    if (!enroll) return res.sendStatus(404);
    res.json(enroll);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.put("/enrolls/:cer_id", async (req, res) => {
  try {
    const cer_id = Number(req.params.cer_id);
    const { m_id, c_id, cer_start, cer_expire } = req.body;

    if (!m_id || !c_id || !cer_start || !cer_expire)
      return res.status(400).json({ message: "Missing fields" });

    const updated = await Enroll.findOneAndUpdate(
      { cer_id },
      { m_id, c_id, cer_start, cer_expire },
      { new: true }
    );

    if (!updated) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.delete("/enrolls/:cer_id", async (req, res) => {
  try {
    const cer_id = Number(req.params.cer_id);
    const deleted = await Enroll.findOneAndDelete({ cer_id });
    if (!deleted) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// GET enrolls by m_id
app.get("/enrolls/member/:m_id", async (req, res) => {
  try {
    const m_id = Number(req.params.m_id);
    const rows = await Enroll.find({ m_id });
    if (!rows.length) return res.sendStatus(404);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// GET enrolls by c_id
app.get("/enrolls/course/:c_id", async (req, res) => {
  try {
    const c_id = Number(req.params.c_id);
    const rows = await Enroll.find({ c_id });
    if (!rows.length) return res.sendStatus(404);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`✅ API ready at http://localhost:${PORT}`);
});
