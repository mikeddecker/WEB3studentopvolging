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
};

module.exports = OpdrachtElementController;
