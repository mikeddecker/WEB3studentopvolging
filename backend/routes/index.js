const homeRouter = require("./home_router");
const studentRouter = require("./student_router");
const opdrachtRouter = require("./opdracht_router");
const rapportRouter = require("./rapport_router");

const express = require("express");
const router = express.Router();

// Home router
router.use("/", homeRouter);
// Students router
router.use("/students", studentRouter);
// Opdracht router
router.use("/opdrachten", opdrachtRouter);
// Rapporten router
router.use("/rapporten", rapportRouter);

// Fallback
router.all("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;
