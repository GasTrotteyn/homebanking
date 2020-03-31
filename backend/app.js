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
app.post('/usuarios',verificarUsuario, (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    console.log(JSON.stringify(usuarios));
    res.status(200).json(nuevoUsuario);
});
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});
app.post('/usuarios/login',logIn, (req, res) => {
    usuario = req.usuario;
    usuario.logIn = true;
    res.status(200).send('Acceso autorizado')
});
app.post('/usuarios/depositos', estaLogueado, (req, res) => {
    usuario = req.usuario;
    const monto = parseInt(req.body.monto) ;
});
///middleware usuario
function verificarUsuario(req, res, next){
    const nombreUsuario = req.body.usuario;
    const usuario = usuarios.find(element =>
        element.usuario === nombreUsuario);
        if (!usuario){
            next();
        }else{
            res.status(404).send('Usuario ya existe, elegi otro')
        }
}
function logIn(req, res, next){
    const nombreUsuario = req.body.usuario;
    const usuario = usuarios.find(element => element.usuario === nombreUsuario)
    const passwordRequerida = parseInt(req.body.password);
    if (usuario && parseInt(usuario.password) === passwordRequerida){
        req.usuario = usuario;
        req.password = passwordRequerida;
        next();
    }else{
        res.status(401).send('Algunos de los datos no son correctos')
    }
}
function estaLogueado( req, res, next){
    const usuario = req.usuario;
    const logIn = usuario.login;
    if(logIn){
        next()
    }
}
