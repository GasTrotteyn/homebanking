const jwt = require('jsonwebtoken');
const firma = require("../firma.json");
const Usuarios = require('../models/models')

function verificarUsuario(req, res, next) {
    const nombreUsuario = req.body.usuario;
    Usuarios.findOne({ 'usuario': nombreUsuario })
        .then((nombreUsuario) => {
            if (!nombreUsuario) {
                next();
            } else {
                res.status(404).send("Usuario ya existe, elegi otro");
            }
        })
}

function logIn(req, res, next) {
    const nombreUsuario = req.body.usuario;
    const passwordRequerida = parseInt(req.body.password);
    Usuarios.find({ usuario: nombreUsuario, password: passwordRequerida })
        .then((user) => {
            if (user) {
                let contenido = { usuario: nombreUsuario };
                //console.log(firma)
                let token = jwt.sign(contenido, firma);
                req.token = { token: token };
                next();
            } else {
                res.status(401).send("Algunos de los datos no son correctos");
            }
        })
}

function getUserFromReq(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodificado = jwt.verify(token, firma);
    return decodificado.usuario
}



function tokenValido(req, res, next) {
    const usuario = getUserFromReq(req);
    if (usuario) {
        console.log('pasó el middleware tokenValido');
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('usuario inválido');
    }
}

function getUserFromDB(usuario) {
    Usuarios.find({ 'usuario': usuario })
        .then((user) => {
            //console.log(user)
            return user
        })
}

function sonUsuarios(req, res, next) {
    let emisor = req.body.usuario;
    let receptor = req.body.receptor;
    Usuarios.findOne({ usuario: emisor })
        .then((respuesta) => {
            req.usuarioEmisor = respuesta;
            Usuarios.findOne({ usuario: receptor })
                .then((respuesta) => {
                    req.usuarioReceptor = respuesta;
                    if (req.usuarioEmisor && req.usuarioReceptor) {
                        next();
                    } else {
                        console.log('alguno de los dos no es usuario');
                        res.status(401).send('alguno de los dos no es usuario')
                    }
                }).catch((error) => {
                    res.status(500).send("error de conexión");
                });
        }).catch((error) => {
            res.status(500).send("error de conexión");
        });
}



function tieneSaldo(req, res, next) {
    usuarioEmisor = req.usuarioEmisor;
    let saldo = parseInt(usuarioEmisor.saldo);
    console.log(saldo);
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
    tokenValido,
    sonUsuarios,
    tieneSaldo,
};