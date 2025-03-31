const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    nombre_estudiante: {
        type: String,
        required: true
    },
    apellido_estudiante: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    profesor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Asistencia', asistenciaSchema);