const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usuarios = require('./usuarios.json');

app.use(cors({ origin: '*' }), bodyParser.json());

app.listen(3001, () => {
    console.log('server running');
});


app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    console.log(JSON.stringify(usuarios));
    res.status(200).json(nuevoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})