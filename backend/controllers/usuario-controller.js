let usuarios = require("../usuarios.json");

function postUsuario(req, res) {
  const nuevoUsuario = req.body;
  nuevoUsuario.saldo = 0;
  usuarios.push(nuevoUsuario);

  res.status(200).json(nuevoUsuario);
}

function getUsuarios(req, res) {
  res.json(usuarios);
}

function getUser(req, res) {
  usuario = req.usuario;
  res.json(usuario);
}

function postLogin(req, res) {
  usuario = req.body;
  usuario.logIn = true;
  res.status(200).json(usuario);
}

async function postDeposito(req, res) {
  usuario = req.usuario;
  const monto = parseInt(req.body.monto);
  usuario.saldo = parseInt(usuario.saldo) + monto;
  let enviar = await JSON.stringify({ saldo: usuario.saldo });
  res.status(200).send(enviar);
}
async function postTransferencia(req, res) {
  usuarioEmisor = req.usuarioEmisor;
  usuarioReceptor = req.usuarioReceptor;

  let monto = parseInt(req.body.monto);
  usuarioEmisor.saldo = parseInt(usuarioEmisor.saldo) - monto;
  usuarioReceptor.saldo = parseInt(usuarioReceptor.saldo) + monto;

  res.status(200).send({
    saldoEmisor: usuarioEmisor.saldo,
    saldoReceptor: usuarioReceptor.saldo
  });
}

module.exports = {
  postUsuario,
  getUsuarios,
  getUser,
  postLogin,
  postDeposito,
  postTransferencia
};
