const mongoose = require('mongoose');

const ventaCursoSchema = new mongoose.Schema({
    curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' },
    estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' },
    fecha: { type: Date, default: Date.now },
    precio: Number
});

module.exports = mongoose.model('VentaCurso', ventaCursoSchema, 'ventacurso');