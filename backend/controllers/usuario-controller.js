const Usuarios = require('../models/models');

function postUsuario(req, res) {
    const nuevoUsuario = req.body;
    objetoUsuario = new Usuarios(nuevoUsuario);
    objetoUsuario.save().then(function (respuesta) {
        console.log(respuesta);
        res.status(201).send()
    })
}

function getUsuarios(req, res) {
    Usuarios.find()
        .then((usuarios) => {
            res.json(usuarios);
        })
        .catch((err) => {
            res.status(500).send()
        })
}
/*
Trae usuario por el nombre de usuario pero no se utiliza en ninguna ruta
function getUser(req, res) {
    const usuario = req.usuario;

    Usuarios.findOne({'usuario' : usuario}, (err, usuario) => {
        if(usuario){
            res.status(200).send('ok')
        }else{
            res.status(401).send('not ok')
        }
    })
}
*/

function postLogin(req, res) {
    res.status(200).json(req.token);
}



function postDeposito(req, res) {
    usuarioSalidoDelToken = req.usuario;
    const monto = parseInt(req.body.monto);
    Usuarios.findOne({ 'usuario': usuarioSalidoDelToken })
        .then((resultado) => {
            resultado.saldo = parseInt(resultado.saldo) + monto;
            resultado.save()
                .then((usuario) => {
                    console.log(usuario);
                    let enviar = JSON.stringify({ saldo: usuario.saldo });
                    res.status(200).send(enviar);
                })
        })
}
function postTransferencia(req, res) {
    let usuarioEmisor = req.usuarioEmisor;
    let usuarioReceptor = req.usuarioReceptor;

    let monto = parseInt(req.body.monto);
    usuarioEmisor.saldo = parseInt(usuarioEmisor.saldo) - monto;
    usuarioEmisor.save().then((resultado) => {
        console.log(resultado.saldo);
    })
    usuarioReceptor.saldo = parseInt(usuarioReceptor.saldo) + monto;
    usuarioReceptor.save().then((resultado) => {
        console.log(resultado.saldo);
    })
    res.status(200).send(JSON.stringify({
        saldoEmisor: usuarioEmisor.saldo,
        saldoReceptor: usuarioReceptor.saldo
    }));
}

module.exports = {
    postUsuario,
    getUsuarios,
    postLogin,
    postDeposito,
    postTransferencia,
};
