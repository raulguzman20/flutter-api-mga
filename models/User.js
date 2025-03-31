const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['Administrador', 'Cliente']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Usuario', userSchema);