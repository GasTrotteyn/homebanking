// hola chicos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usuarios = require('./usuarios.json');
app.use(cors({ origin: '*' }), bodyParser.json());
app.listen(3001, () => {
    console.log('server running');
});
app.post('/usuarios', verificarUsuario, (req, res) => {
    const nuevoUsuario = req.body;
    nuevoUsuario.saldo = 0;
    usuarios.push(nuevoUsuario);
    console.log(JSON.stringify(usuarios));
    res.status(200).json(nuevoUsuario);
});
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});
app.get('/usuarios/:usuario', esUnUsuario, (req, res) => {
    usuario = req.usuario;
    res.json(usuario);
});

app.post('/usuarios/login', logIn, (req, res) => {
    usuario = req.body;
    usuario.logIn = true;
    res.status(200).json(usuario)
});

///////////////
app.post('/usuarios/:usuario/depositos', esUnUsuario, async function (req, res) {
    usuario = req.usuario;
    console.log(req.body);
    const monto = parseInt(req.body.monto);
    usuario.saldo = parseInt(usuario.saldo) + monto;
    let enviar = await JSON.stringify({ saldo: usuario.saldo })
    res.status(200).send(enviar);
});

///middleware usuario
function verificarUsuario(req, res, next) {
    const nombreUsuario = req.body.usuario;
    const usuario = usuarios.find(element =>
        element.usuario === nombreUsuario);
    if (!usuario) {
        next();
    } else {
        res.status(404).send('Usuario ya existe, elegi otro')
    }
}
function logIn(req, res, next) {
    const nombreUsuario = req.body.usuario;
    const usuario = usuarios.find(element => element.usuario === nombreUsuario)
    const passwordRequerida = parseInt(req.body.password);
    if (usuario && parseInt(usuario.password) === passwordRequerida) {
        req.usuario = usuario;
        req.password = passwordRequerida;

        next();
    } else {
        res.status(401).send('Algunos de los datos no son correctos')
    }
}

////////////
function esUnUsuario(req, res, next) {
    const nombreUsuario = req.params.usuario;
    const usuario = usuarios.find(element => element.usuario === nombreUsuario)
    if (usuario) {
        req.usuario = usuario;
        //req.saldo = saldo
        next();
    } else {
        res.status(404).send('Usuario no registrado')
    }
}
// function estaLogueado( req, res, next){
//     const usuario = req.usuario;
//     const logIn = usuario.login;
//     if(logIn){
//         next()
//     }
// }
