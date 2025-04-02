const mongoose = require('mongoose');

const ventaMatriculaSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    estudiante: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    }
}, { collection: 'ventamatricula' });

module.exports = mongoose.model('VentaMatricula', ventaMatriculaSchema);