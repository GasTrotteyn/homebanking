const Usuarios = require('../models/models');

function postUsuario(req, res) {
    const nuevoUsuario = req.body;
    objetoUsuario = new Usuarios(nuevoUsuario);
    objetoUsuario.save()
        .then(async function (objetoUsuario) {
            objetoUsuario_id = objetoUsuario.dni;
            await objetoUsuario.save()
            console.log(objetoUsuario_id)
            res.status(200).send()
        })
        .catch((error) => {
            res.status(500).send()
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

function getUserFromDB(usuario) {
    Usuarios.find({'usuario': usuario})
    .then((user) => {
        //console.log(user)
        return user
    })
}

function postDeposito(req, res) {
    usuarioSalidoDelToken = req.usuario;
    const monto = parseInt(req.body.monto);
    let usuario = getUserFromDB(usuarioSalidoDelToken);
    console.log(usuario)
    usuario.saldo = parseInt(usuario.saldo) + monto;
    usuario.save()
    .then((usuario) => {
        let enviar = JSON.stringify({ saldo: usuario.saldo });
        res.status(200).send(enviar);
    })
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
    postLogin,
    postDeposito,
    postTransferencia,
};
