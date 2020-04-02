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
    //console.log(JSON.stringify(usuarios));
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
    //console.log(req.body);
    const monto = parseInt(req.body.monto);
    usuario.saldo = parseInt(usuario.saldo) + monto;
    let enviar = await JSON.stringify({ saldo: usuario.saldo })
    res.status(200).send(enviar);
});

app.post('/usuarios/transferencias', sonUsuarios, tieneSaldo, async function (req, res) {
    usuarioEmisor = req.usuarioEmisor;
    usuarioReceptor = req.usuarioReceptor;

    let monto = parseInt(req.body.monto);
    usuarioEmisor.saldo = parseInt(usuarioEmisor.saldo) - monto;
    usuarioReceptor.saldo = parseInt(usuarioReceptor.saldo) + monto;

    res.status(200).send({
        saldoEmisor: usuarioEmisor.saldo,
        saldoReceptor: usuarioReceptor.saldo
    })

})
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
        next();
    } else {
        res.status(404).send('Usuario no registrado')
    }
}
/////////midd verificar los dos son usuarios
function sonUsuarios(req, res, next) {
    let emisor = req.body.usuario;
    const usuarioEmisor = usuarios.find(element => element.usuario === emisor)

    let receptor = req.body.receptor;
    const usuarioReceptor = usuarios.find(element => element.usuario === receptor)
    //console.log(usuarioReceptor)
    if (usuarioEmisor && usuarioReceptor) {
        req.usuarioEmisor = usuarioEmisor
        //console.log(usuarioEmisor)
        req.usuarioReceptor = usuarioReceptor;
        next();
    } else {
        res.status(401).send('Alguno de los usuarios no es correcto')
    }
}

function tieneSaldo(req, res, next) {
    usuarioEmisor = req.usuarioEmisor
    let saldo = parseInt(usuarioEmisor.saldo);
    //console.log(saldo)
    let monto = parseInt(req.body.monto);
    console.log(monto)
    if (saldo > monto) {
        req.monto = monto
        next();
    }else{
        res.status(201).send('No te alcanza cariño')
    }
}


