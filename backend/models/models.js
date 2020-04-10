const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const usuario = new Schema({

    nombre: String,
    apellido: String,
    dni: Number,
    usuario: String,
    password: Number,
    saldo: {type: Number, default: 0},
    cuenta: [
        {
            tipoDeCuenta: String,
            numeroDeCuenta: mongoose.Types.ObjectId
        }
    ]
})

const Usuarios = mongoose.model('Usuarios', usuario);

module.exports = Usuarios