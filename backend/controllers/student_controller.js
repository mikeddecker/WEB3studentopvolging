const { opdrachtElement } = require("../config/db");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Prisma } = require("@prisma/client");

const StudentController = {
  findAll: async (req, res) => {
    try {
      const students = await db.student.findMany({
        where: {
          geldig: 1,
        },
      });
      res.status(202).json(students);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  findAllOpdrachten: async (req, res) => {
    const studentId = Number.parseInt(req.params.id);
    if (studentId) {
      try {
        const opdrachten = await db.student.findFirst({
          where: {
            geldig: 1,
            id: studentId,
            rapporten: {
              every: {
                geldig: 1,
                opdrachtElement: {
                  geldig: 1,
                },
              },
            },
          },
          include: {
            rapporten: {
              select: {
                opdrachtElement: {
                  select: {
                    opdracht: true,
                  },
                },
              },
              where: {
                geldig: 1,
              },
            },
          },
        });
        res.status(201).send(opdrachten);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  },
  findById: async (req, res) => {
    const studentId = Number.parseInt(req.params.id);

    try {
      const student = await db.student.findFirst({
        where: {
          id: studentId,
          geldig: 1,
        },
      });
      res.status(202).json(student);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  register: async (req, res) => {
    // TODO: Validatie
    const { email, pincode, username, lastName, firstName, sortName } =
      req.body;

    try {
      const hash = bcrypt.hashSync(pincode, 12);

      let userData = {
        code: hash,
        gebruikersNaam: username,
        familieNaam: lastName,
        voorNaam: firstName,
        sorteerNaam: sortName,
        email: email,
        // aanmaakDatum: Date.now(),
        geldig: 1,
      };

      await db.student.create({
        data: userData,
      });
      res.status(201).send("Student is aangemaakt");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(406).send("Er is al een gebruiker met dit email adres");
        }
      }

      res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    // TODO: Validatie
    const { email, pincode } = req.body;
    console.log(`logging in ${email}, ${pincode}`);
    try {
      const student = await db.student.findFirst({
        where: {
          email: email,
          geldig: 1,
        },
      });
      //console.log(student.code);
      if (student) {
        //console.log(`${pincode}, ${student.code}`)
        const result = pincode === student.code;
        //const result = await bcrypt.compare(pincode, student.code);
        if (result) {
          const token = jwt.sign(
            { id: student.id, email: student.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "4h",
            }
          );

          console.log(`${student.email} logged in with token : ${token}`);

          res.cookie("student_token", token, {
            httpOnly: true,
            // secure: true   --> Only if https
            maxAge: 4 * 60 * 60 * 1000,
          });

          res.status(202).send("ok");
        } else {
          res.status(403).send("Pincode verkeerd");
        }
      } else {
        res.status(403).send(`Geen student ${email} gevonden`)
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
  verifyToken: async (req, res) => {
    //res.status(202).send("student test");
    if (req.cookies && req.cookies.student_token) {
      const token = req.cookies.student_token;
      const student = jwt.verify(token, process.env.JWT_SECRET);
      if (student) {
        res.status(202).send(student);
      } else {
        res.status(403).send("Unauthorized");
      }
    } else {
      res.status(200).send("OK, no cookies on this site yet");
    }
  },
  delete: async (req, res) => {
    const userId = Number.parseInt(req.params.id);

    try {
      await db.student.delete({
        where: {
          id: userId,
        },
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  count: async (req, res) => {
    try {
      const count = await db.student.count();
      res.status(200).json(count);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = StudentController;
