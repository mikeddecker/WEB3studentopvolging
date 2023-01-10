const { rapport, student } = require("../config/db");
const db = require("../config/db");

const RapportController = {
  findAll: async (req, res) => {
    let error = "not implemented";
    res.status(500).send(error);
  },
  findByUserElementId: async (req, res) => {
    // TODO: Validatie
    try {
      const { elementId } = req.body;
      const { id } = req.student;
      await console.log(`findByUserElementId rapportId: ${elementId}, studentId: ${id}`);
      const rapport = await db.rapport.findFirst({
        where: {
          opdrachtElementId: elementId,
          studentId: id,
        },
      });
      if (rapport) {
        console.log('rapport gevonden');
        console.log(rapport);
        res.status(200).send(rapport);
      } else {
        console.log('accepted terugsturen als signaal dat er een rapport gemaakt moet worden');
        res.status(204).send();
      }
    }
    catch (error) {
      res.status(500).send(error);
    }
  },
  updateStatus: async (req, res) => {
    // TODO: Validatie
    console.log("updatingStatus");
    try{
      const { status, rapportId } = req.body;
      const { id } = req.student;
      console.log(`updating status ${status}, ${rapportId}, ${id}`);
      const updateRapport = await db.rapport.update({
        where: {
          id: rapportId,
        },
        data:{
          status: status
        }
      });
      console.log('updated');
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addQuestion: async (req, res) => {
    // TODO: Validatie
    try{
      const { question, rapportID } = req.body;
      console.log(`inserting question ${question}, ${rapportID}`);
      const insertedQuestion = await db.vraagStudent.create({
        data:{
          beschrijving: question,
          rapportId: rapportID
        }
      });
      console.log('extra tijd toegevoegd');
      res.status(201).send(insertedQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  addExtraTime: async (req, res) => {
    // TODO: Validatie
    console.log("adding extra tijd");
    try{
      const { xtraTime, rapportId } = req.body;
      const { id } = req.student;
      console.log(`updating extra tijd ${xtraTime}, ${rapportId}, ${id}`);
      const updateRapport = await db.rapport.update({
        where: {
          id: rapportId,
        },
        data:{
          extraMinuten: xtraTime
        }
      });
      console.log('extra tijd toegevoegd');
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  create: async (req, res) => {
    const { elementId } = req.body;
    const { id } = req.student;
    console.log(`creating rapport with elementId ${elementId} and studentId ${id}`);
    const rapport = await db.rapport.create({
      data: {
        opdrachtElementId: elementId,
        studentId: id
      }
    });
    res.status(200).send(rapport);
  },
  read: () => { },
  update: () => { },
  delete: () => { },
};

module.exports = RapportController;
