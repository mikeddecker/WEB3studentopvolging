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
    console.log('update kahootstatus')
    try {
      // Eerst alle mogelijke andere kahootvragen deactiveren;
      await db.opdrachtElement.updateMany({
        where: {
          kahootActief: true
        },
        data: {
          kahootActief: false
        }
      });
      console.log('update kahootstatus')

      // Doorgekregen opdrachtkahoot actief maken
      const update = await db.opdrachtElement.update({
        where:{
          id: Number.parseInt(id),
        },
        data: {
          kahootActief: actief
        }
      });
      
      if (update.opdrachtId >= 0) {
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
      console.log('sluit kahoots');
      const {data} = req.body.data;
      const update = await db.opdrachtElement.updateMany({
        where: {
          kahootActief: true
        },
        data: {
          kahootActief: false
        }
      });
      if (update.count > 0) {
        console.log(update);
        res.status(200).json(update);
      } else if (update.count === 0) {
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
