const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    especialidad: String
}, { collection: 'profesores' });

module.exports = mongoose.model('Profesor', profesorSchema);