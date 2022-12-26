const { rapport, student } = require("../config/db");
const db = require("../config/db");

const RapportController = {
  findAll: async (req, res) => {
      res.status(500).send(error);
  },
  findByUserElementId: async (req, res) => {
    // TODO: Validatie
    const { elementId } = req.body;
    const { id } = req.student;
    res.status(500).send(error);
  },
  updateStatus: async (req, res) => {
    // TODO: Validatie
    const { status, elementId } = req.body;
    const { id } = req.student;
    res.status(500).send(error);
  },
  addQuestion: async (req, res) => {
    // TODO: Validatie
    const { elementId, question } = req.body;
    const { id } = req.student;
    res.status(500).send(error);
  },
  addExtraTime: async (req, res) => {
    // TODO: Validatie
    const { elementId, extraTijd } = req.body;
    const { id } = req.student;
    res.status(500).send(error);
  },
  create: () => {},
  read: () => {},
  update: () => {},
  delete: () => {},
};

module.exports = RapportController;
