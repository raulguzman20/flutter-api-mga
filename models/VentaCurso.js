const mongoose = require('mongoose');

const ventaCursoSchema = new mongoose.Schema({
    cliente: {
        type: String,
        required: true
    },
    estudiante: {
        type: String,
        required: true
    },
    ciclo: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    clases: {
        type: Number,
        required: true
    },
    valor_curso: {
        type: Number,
        required: true
    },
    debe: {
        type: Number,
        default: 0
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('VentaCurso', ventaCursoSchema);