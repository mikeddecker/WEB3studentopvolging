const express = require("express");
const {
  OpdrachtController,
  OpdrachtElementController,
  UploadController
} = require("../controllers");
const router = express.Router();

// GET
router.get("/", OpdrachtController.findAll);
router.get("/:id([0-9]+)", OpdrachtController.findById);
router.get("/:name([a-z,A-Z,0-9]+)", OpdrachtController.findByName);

router.get("/element/:id([0-9]+)", OpdrachtElementController.findById);

// POST
router.post("/upload", UploadController.upload);

module.exports = router;
