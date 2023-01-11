const db = require("../config/db");

const OpdrachtElementController = {
  findById: async (req, res) => {
    const { id } = req.params;

    try {
      const count = await db.student.count();

      const opdrachtElement = await db.opdrachtElement.findFirst({
        where: {
          id: Number.parseInt(id),
          geldig: 1,
          rapporten: {
            every: {
              geldig: 1,
              student: {
                geldig: 1,
              },
              vragen: {
                every: {
                  geldig: 1,
                },
              },
            },
          },
        },
        include: {
          rapporten: {
            include: {
              student: {
                select: {
                  email: true,
                  voorNaam: true,
                  familieNaam: true,
                },
              },
              vragen: true,
            },
          },
        },
      });

      if (opdrachtElement) {
        res.status(200).send({ count, opdrachtElement });
      } else {
        res.status(404).send("Not found");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  updateKahootStatus: async (req,res) => {
    const { id } = req.params;
    const { actief } = req.body;
    
    try {
      await db.opdrachtElement.updateMany({
        where: {
          kahootActief: true
        },
        data: {
          kahootActief: false
        }
      });
      const update = await db.opdrachtElement.update({
        where:{
          id: Number.parseInt(id),
        },
        data: {
          kahootActief: actief
        }
      });
      console.log(update.opdrachtId);
      if (update.opdrachtId > 0) {
        console.log(update);
        res.status(200).json(update);
      } else {
        res.status(404).send("failed");
      }

    } catch (error) {
      console.log(error);
    }
  },
  sluitkahoots: async (req,res) => {
    try {
      const update = await db.opdrachtElement.updateMany({
        where: {
          kahootActief: true
        },
        data: {
          kahootActief: false
        }
      });
      console.log(update);
      if (update > 0) {
        console.log(update);
        res.status(200).json(update);
      } else {
        res.status(404).send("failed");
      }

    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = OpdrachtElementController;
