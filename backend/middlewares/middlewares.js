let usuarios = require("../usuarios.json");
function verificarUsuario(req, res, next) {
  const nombreUsuario = req.body.usuario;
  const usuario = usuarios.find(element => element.usuario === nombreUsuario);
  if (!usuario) {
    next();
  } else {
    res.status(404).send("Usuario ya existe, elegi otro");
  }
}
function logIn(req, res, next) {
  const nombreUsuario = req.body.usuario;
  const usuario = usuarios.find(element => element.usuario === nombreUsuario);
  const passwordRequerida = parseInt(req.body.password);
  if (usuario && parseInt(usuario.password) === passwordRequerida) {
    req.usuario = usuario;
    req.password = passwordRequerida;

    next();
  } else {
    res.status(401).send("Algunos de los datos no son correctos");
  }
}

function esUnUsuario(req, res, next) {
  const nombreUsuario = req.params.usuario;
  const usuario = usuarios.find(element => element.usuario === nombreUsuario);
  if (usuario) {
    req.usuario = usuario;
    next();
  } else {
    res.status(404).send("Usuario no registrado");
  }
}

function sonUsuarios(req, res, next) {
  let emisor = req.body.usuario;
  const usuarioEmisor = usuarios.find(element => element.usuario === emisor);
  let receptor = req.body.receptor;
  const usuarioReceptor = usuarios.find(element => element.usuario === receptor);
  if (usuarioEmisor && usuarioReceptor) {
    req.usuarioEmisor = usuarioEmisor;

    req.usuarioReceptor = usuarioReceptor;
    next();
  } else {
    res.status(401).send("Alguno de los usuarios no es correcto");
  }
}

function tieneSaldo(req, res, next) {
  usuarioEmisor = req.usuarioEmisor;
  let saldo = parseInt(usuarioEmisor.saldo);
  let monto = parseInt(req.body.monto);
  if (saldo > monto) {
    req.monto = monto;
    next();
  } else {
    res.status(201).send("No te alcanza cariño");
  }
}

module.exports = {
  verificarUsuario,
  logIn,
  esUnUsuario,
  sonUsuarios,
  tieneSaldo
};
