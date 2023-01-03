const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ log: ["info", "warn", "error"] });

async function main() {
  // Models
  const models = [
    "Groep",
    "GroepStudent",
    "Opdracht",
    "OpdrachtElement",
    "Rapport",
    "Student",
    "VraagStudent",
  ];

  const queries = ["findMany", "findFirst", "findUnique"];

  // Middleware SOFT DELETE
  prisma.$use((params, next) => {
    if (models.includes(params.model)) {
      if (params.action === "delete") {
        params.action = "update";
        params.args["data"] = { geldig: 0 };
      }
      if (params.action === "deleteMany") {
        params.action = "updateMany";
        if (params.args.data != undefined) {
          params.args.data["geldig"] = 0;
        } else {
          params.args["data"] = { geldig: 0 };
        }
      }
    }
    return next(params);
  });
}

main();

module.exports = prisma;
