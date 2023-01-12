const db = require("../config/db");

const OpdrachtController = {
  findAll: async (req, res) => {
    try {
      const opdrachten = await db.opdracht.findMany({
        where: {
          geldig: 1,
        },
        include: {
          elementen: {
            where: {
              geldig: 1,
              rapporten: {
                every: {
                  geldig: 1,
                  vragen: {
                    every: {
                      geldig: 1,
                    },
                  },
                  student: {
                    geldig: 1,
                  },
                },
              },
            },
            include: {
              rapporten: {
                include: {
                  student: {
                    select: {
                      id: true,
                      email: true,
                      voorNaam: true,
                      familieNaam: true,
                      gebruikersNaam: true,
                    },
                  },
                  vragen: {
                    select: {
                      id: true,
                      beschrijving: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res.status(202).json(opdrachten);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  findById: async (req, res) => {
    const opdrachtId = Number.parseInt(req.params.id);

    try {
      const opdracht = await db.opdracht.findFirst({
        where: {
          id: opdrachtId,
          geldig: 1,
        },
        include: {
          elementen: {
            where: {
              geldig: 1,
            },
          },
        },
      });
      res.status(202).json(opdracht);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  findByName: async (req, res) => {
    const opdrachtNaam = req.params.name;

    try {
      const opdracht = await db.opdracht.findFirst({
        where: {
          naam: opdrachtNaam,
          geldig: 1,
        },
        include: {
          elementen: {
            where: {
              geldig: 1,
            },
          },
        },
      });
      res.status(202).json(opdracht);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getAllOpdrachten: async (req, res) => {
    const opdrachtNaam = req.params.name;

    try {
      const opdrachten = await db.opdracht.findMany({
        where: {
          geldig: 1,
        },
        include: {
          elementen: {
            where: {
              geldig: 1,
            },
          },
        },
      });
      res.status(202).json(opdrachten);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  findKahootActief: async (req, res) => {
    try{

      const opdrachtElement = await db.opdrachtElement.findFirst({
        where:{
          kahootActief: true,
        },
      });
      if (opdrachtElement) {
        res.status(202).json(opdrachtElement);
      } else {
        res.status(404).json("not found");
      }
    } catch (error){
      console.log(error);
      res.status(500).error(error);
    }
  },
};

module.exports = OpdrachtController;
