const express = require("express");
const UsuarioController = require("../controllers/usuario-controller");
const middlewares = require("../middlewares/middlewares");
const api = express.Router();

api.post("/",  UsuarioController.postUsuario);
api.post("/login", middlewares.logIn, UsuarioController.postLogin);
api.post("/:usuario/depositos", middlewares.tokenValido, UsuarioController.postDeposito);
api.post(
    "/transferencias", middlewares.tokenValido,
    middlewares.sonUsuarios,
    middlewares.tieneSaldo,
    UsuarioController.postTransferencia
);
api.get("/", UsuarioController.getUsuarios);
api.get("/:usuario", middlewares.tokenValido, UsuarioController.getUser);

module.exports = api;
