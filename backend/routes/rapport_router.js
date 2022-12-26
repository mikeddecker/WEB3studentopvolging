const express = require("express");
const { RapportController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const router = express.Router();

router.get("/", RapportController.findAll);

router.post(
  "/opdrachtelement",
  authMiddleware,
  RapportController.findByUserElementId
);

router.post("/updatestatus", authMiddleware, RapportController.updateStatus);

router.post("/addquestion", authMiddleware, RapportController.addQuestion);

router.post("/extraTijd", authMiddleware, RapportController.addExtraTime);

module.exports = router;
