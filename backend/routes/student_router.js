const express = require("express");
const { StudentController } = require("../controllers");
const router = express.Router();

// GET
router.get("/", StudentController.findAll);
router.get("/:id([0-9]+)", StudentController.findById);
router.get("/opdrachten/:id([0-9]+)", StudentController.findAllOpdrachten);
router.get("/verifyToken", StudentController.verifyToken);

router.get("/count", StudentController.count);

// POST
router.post("/register", StudentController.register);
router.post("/login", StudentController.login);

// UPDATE

// DELETE
router.delete("/:id", StudentController.delete);

module.exports = router;
