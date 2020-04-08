//let usuarios = require("../usuarios.json");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuario = new Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: Number,
    saldo: Number
})

const Usuarios = mongoose.model('Usuarios', usuario);

function postUsuario(req, res) {
    const nuevoUsuario = req.body;
    objetoUsuario = new Usuarios(nuevoUsuario);
    //nuevoUsuario.saldo = 0;
    //usuarios.push(nuevoUsuario);
    objetoUsuario.save().then((resultado) => {
        res.status(200).send()
    })
        .catch((error) => {
            res.status(500).send()
        })
}

function getUsuarios(req, res) {
    res.json(usuarios);
}

function getUser(req, res) {
    usuario = req.usuario;
    res.json(usuario);
}

function postLogin(req, res) {
    res.status(200).json(req.token);
}

function getUserFromDB(user) {
    const encontrado = usuarios.find(element => element.usuario === user);
    return encontrado
}

function postDeposito(req, res) {
    usuarioSalidoDelToken = req.usuario;
    const monto = parseInt(req.body.monto);
    usuario = getUserFromDB(usuarioSalidoDelToken);
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
