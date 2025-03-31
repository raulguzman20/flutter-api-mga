const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
    numero_aula: {
        type: Number,
        required: true,
        unique: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Aula', aulaSchema);