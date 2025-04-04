const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    asistencia: [{
        nombre_estudiante: String,
        apellido_estudiante: String,
        fecha: String,
        hora: String,
        profesor: String
    }]
}, { 
    collection: 'asistencia',
    strict: false,
    timestamps: false
});

const Asistencia = mongoose.model('Asistencia', asistenciaSchema);
module.exports = Asistencia;