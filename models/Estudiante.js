const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    acudientes: [{
        type: String,
        required: true
    }],
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Estudiante', estudianteSchema);