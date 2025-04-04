const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    cedula: String,
    telefono: String,
    direccion: String,
    especialidad: String,
    estado: Boolean
}, { 
    collection: 'profesores',
    versionKey: false 
});

module.exports = mongoose.model('Profesor', profesorSchema);