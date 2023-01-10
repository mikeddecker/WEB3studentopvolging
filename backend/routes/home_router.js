const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(202).send("Home page");
});

module.exports = router;
