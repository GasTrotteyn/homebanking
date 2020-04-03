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
    let usuario = req.body;
    console.log(usuario);
    let token = req.token;
    console.log(token);
    usuario.token = token;
    res.status(200).json(token);
}

function postDeposito(req, res) {
    usuario = req.usuario;
    const monto = parseInt(req.body.monto);
    usuario.saldo = parseInt(usuario.saldo) + monto;
    let enviar = JSON.stringify({ saldo: usuario.saldo });
    res.status(200).send(enviar);
}
function postTransferencia(req, res) {
    let usuarioEmisor = req.usuarioEmisor;
    let usuarioReceptor = req.usuarioReceptor;

    let monto = parseInt(req.body.monto);
    usuarioEmisor.saldo = parseInt(usuarioEmisor.saldo) - monto;
    usuarioReceptor.saldo = parseInt(usuarioReceptor.saldo) + monto;

    res.status(200).send(JSON.stringify({
        saldoEmisor: usuarioEmisor.saldo,
        saldoReceptor: usuarioReceptor.saldo
    }));
}

module.exports = {
    postUsuario,
    getUsuarios,
    getUser,
    postLogin,
    postDeposito,
    postTransferencia
};
