import express from "express";
import roleMiddleware from "../middleware/roleMiddleware.js";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", sort = "name", order = "asc" } = req.query;

    const filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { emailaddress: { $regex: search, $options: "i" } }
      ]
    };

    const sortOption = {};
    sortOption[sort] = order === "asc" ? 1 : -1;

    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      students,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", roleMiddleware(["admin"]), async (req, res) => {
  const saved = await new Student(req.body).save();
  res.json(saved);
});

router.put("/:id", roleMiddleware(["admin"]), async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", roleMiddleware(["admin"]), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

router.delete("/", roleMiddleware(["admin"]), async (req, res) => {
  await Student.deleteMany();
  res.sendStatus(204);
});

export default router;