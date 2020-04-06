let usuarios = require("../usuarios.json");
const jwt = require('jsonwebtoken');
const firma = require("../firma.json");



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
    const passwordRequerida = parseInt(req.body.password);
    const usuario = usuarios.find(element => element.usuario === nombreUsuario && element.password === passwordRequerida);
    if (usuario) {
        let contenido = { usuario: nombreUsuario };
        let token = jwt.sign(contenido, firma);
        req.token = { token: token };
        next();
    } else {
        res.status(401).send("Algunos de los datos no son correctos");
    }
}

function getUserFromReq(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodificado = jwt.verify(token, firma);
    return decodificado.usuario
}

function tokenValido(req, res, next) {
    const usuario = getUserFromReq(req);
    if (usuario) {
        console.log('tomá!');
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('usuario inválido');
    }
}

function sonUsuarios(req, res, next) {
    let emisor = req.body.usuario;
    let usuarioEmisor = usuarios.find(element => element.usuario === emisor);
    let receptor = req.body.receptor;
    let usuarioReceptor = usuarios.find(element => element.usuario === receptor);
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
    tokenValido,
    sonUsuarios,
    tieneSaldo
};