require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");


const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const routers = require("./routes/index");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routers);

// Aanmaken van de HTTP server
const server = http.createServer(app);

// Het aanmaken van de socket.io instantie
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Test of de socket connectie werkt
io.on("connection", (socket) => {
  console.log("A user is connected: ", socket.id);
  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log("User is disconnected");
  });

  socket.on("helo", () => { console.log("authed"); io.emit("authed"); });

  // rapportupdate doorgeven aan host
  socket.on("studentRapportUpdate", () => { console.log("rapportupdate van student"); io.emit("dashboardChange"); })

  // Nieuwe kahootvraag doorgeven aan studenten
  socket.on("nkvh", (beschrijving) => { io.emit("nkvs",beschrijving); console.log("NieuweKahootVraagHost, NieuweKahootVraagServer");});
  // Student heeft kahoot opgehaald
  //socket.on("studentConnecteerdMetVraag", () => {io.emit("studentConnecteerdMetVraag");})

  //Student heeft zich ingelogged
  socket.on("iLoggedIn", () => io.emit("studentLoggedIn"));
});

server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log("Server is listening on port: ", process.env.SERVER_PORT || 3000);
});
