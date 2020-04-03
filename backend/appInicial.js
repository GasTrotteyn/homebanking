const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

let usuarios = require("./usuarios.json");
const usuario_routes = require("./routes/usuario-routes");

app.use(cors({ origin: "*" }), bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/usuarios", usuario_routes);

module.exports = app;
