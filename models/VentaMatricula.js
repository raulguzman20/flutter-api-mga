const mongoose = require('mongoose');

const ventaMatriculaSchema = new mongoose.Schema({
    matricula: { type: mongoose.Schema.Types.ObjectId, ref: 'Matricula' },
    estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' },
    fecha: { type: Date, default: Date.now },
    precio: Number
});

module.exports = mongoose.model('VentaMatricula', ventaMatriculaSchema, 'ventamatricula');