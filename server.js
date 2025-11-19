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

/* ===== MEMBERS ===== */

// 1) GET all members
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 2) POST new member
app.post("/members", async (req, res) => {
  try {
    const newMember = await Member.create(req.body);
    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 3) GET member by id
app.get("/members/:id", async (req, res) => {
  try {
    const m = await Member.findById(req.params.id);
    if (!m) return res.sendStatus(404);
    res.json(m);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 4) UPDATE member
app.put("/members/:id", async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 5) DELETE member
app.delete("/members/:id", async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.json({ message: "Member deleted" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

/* ===== COURSES ===== */

// 6) GET all courses
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 7) POST create course
app.post("/courses", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 8) GET course by id
app.get("/courses/:id", async (req, res) => {
  try {
    const c = await Course.findById(req.params.id);
    if (!c) return res.sendStatus(404);
    res.json(c);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 9) UPDATE course
app.put("/courses/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 10) DELETE course
app.delete("/courses/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

/* ===== ENROLLS ===== */

// 11) GET all enrolls
app.get("/enrolls", async (req, res) => {
  try {
    const enrolls = await Enroll.find().populate("m_id").populate("c_id");
    res.json(enrolls);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 12) POST create enroll
app.post("/enrolls", async (req, res) => {
  try {
    const newEnroll = await Enroll.create(req.body);
    res.status(201).json(newEnroll);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 13) GET enroll by id
app.get("/enrolls/:id", async (req, res) => {
  try {
    const e = await Enroll.findById(req.params.id)
      .populate("m_id")
      .populate("c_id");
    if (!e) return res.sendStatus(404);
    res.json(e);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 14) UPDATE enroll
app.put("/enrolls/:id", async (req, res) => {
  try {
    const updated = await Enroll.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.sendStatus(404);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 15) DELETE enroll
app.delete("/enrolls/:id", async (req, res) => {
  try {
    const deleted = await Enroll.findByIdAndDelete(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.json({ message: "Enroll deleted" });
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 16) GET enrolls by member id
app.get("/enrolls/member/:m_id", async (req, res) => {
  try {
    const list = await Enroll.find({ m_id: req.params.m_id }).populate("c_id");
    if (!list.length) return res.sendStatus(404);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

// 17) GET enrolls by course id
app.get("/enrolls/course/:c_id", async (req, res) => {
  try {
    const list = await Enroll.find({ c_id: req.params.c_id }).populate("m_id");
    if (!list.length) return res.sendStatus(404);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`✅ API ready at http://localhost:${PORT}`);
});