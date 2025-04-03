const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose'); // Add this line
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import models
const Cliente = require('./models/Cliente');
const Asistencia = require('./models/Asistencia');
const Aula = require('./models/Aula');
const Estudiante = require('./models/Estudiante');
const Profesor = require('./models/Profesor');
const User = require('./models/User');
const VentaCurso = require('./models/VentaCurso');
const VentaMatricula = require('./models/VentaMatricula');

// Near your mongoose.connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Rutas para clientes
app.post('/api/clientes', async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
});

// Ruta para listar todos los clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
});

// Rutas para asistencias
app.post('/api/asistencias', async (req, res) => {
    try {
        const asistencia = new Asistencia(req.body);
        await asistencia.save();
        res.json(asistencia);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la asistencia', error: error.message });
    }
});

// Ruta para listar todas las asistencias
app.get('/api/asistencia', async (req, res) => {
    try {
        const asistencias = await mongoose.connection.db
            .collection('asistencia')
            .find({})
            .toArray();

        const formattedAsistencias = asistencias.map(asistencia => ({
            nombre_estudiante: asistencia.nombre_estudiante,
            apellido_estudiante: asistencia.apellido_estudiante,
            fecha: asistencia.fecha,
            hora: asistencia.hora,
            profesor: asistencia.profesor
        }));

        res.json(formattedAsistencias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asistencias', error: error.message });
    }
});

app.put('/api/asistencia/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Asistencia actualizada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar asistencia', error: error.message });
    }
});

app.delete('/api/asistencia/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('asistencia')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Asistencia eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar asistencia', error: error.message });
    }
});

// Ruta para listar todas las asistencias
app.get('/api/asistencias', async (req, res) => {
    try {
        const asistencias = await Asistencia.find();
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asistencias', error: error.message });
    }
});

// Rutas para aulas
app.post('/api/aulas', async (req, res) => {
    try {
        const aula = new Aula(req.body);
        await aula.save();
        res.json(aula);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el aula', error: error.message });
    }
});

// Ruta para listar todas las aulas
app.get('/api/aulas', async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.json(aulas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las aulas', error: error.message });
    }
});

// Rutas para estudiantes
app.post('/api/estudiantes', async (req, res) => {
    try {
        const estudiante = new Estudiante(req.body);
        await estudiante.save();
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el estudiante', error: error.message });
    }
});

// Ruta para listar todos los estudiantes
app.get('/api/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estudiantes', error: error.message });
    }
});

// Rutas para profesores
app.post('/api/profesores', async (req, res) => {
    try {
        const profesor = new Profesor(req.body);
        await profesor.save();
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear profesor', error: error.message });
    }
});

// Ruta para listar todos los profesores
// Profesores routes
app.get('/api/profesores', async (req, res) => {
    try {
        const profesores = await mongoose.connection.db
            .collection('profesores')
            .find({})
            .toArray();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener profesores', error: error.message });
    }
});

// Asistencia routes
app.get('/api/asistencia', async (req, res) => {
    try {
        const asistencias = await mongoose.connection.db
            .collection('asistencia')
            .find({})
            .toArray();

        const formattedAsistencias = asistencias.map(asistencia => ({
            nombre_estudiante: asistencia.nombre_estudiante,
            apellido_estudiante: asistencia.apellido_estudiante,
            fecha: asistencia.fecha,
            hora: asistencia.hora,
            profesor: asistencia.profesor
        }));

        res.json(formattedAsistencias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asistencias', error: error.message });
    }
});

app.put('/api/asistencia/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Asistencia actualizada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar asistencia', error: error.message });
    }
});

app.delete('/api/asistencia/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('asistencia')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Asistencia eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar asistencia', error: error.message });
    }
});

// VentaCurso routes
app.get('/api/ventacurso', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventacurso')
            .findOne({});

        if (result && result.venta_cursos) {
            const formattedCursos = result.venta_cursos.map(curso => ({
                cliente: curso.cliente,
                estudiante: curso.estudiante,
                ciclo: curso.ciclo,
                curso: curso.curso,
                clases: curso.clases,
                valor_curso: curso.valor_curso,
                debe: curso.debe,
                estado: curso.estado
            }));
            res.json(formattedCursos);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ventas de cursos', error: error.message });
    }
});

app.put('/api/ventacurso/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventacurso')
            .updateOne(
                { "venta_cursos._id": new mongoose.Types.ObjectId(req.params.id) },
                { $set: { "venta_cursos.$": req.body } }
            );
        res.json({ message: 'Venta de curso actualizada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar venta de curso', error: error.message });
    }
});

app.delete('/api/ventacurso/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventacurso')
            .updateOne(
                {},
                { $pull: { venta_cursos: { _id: new mongoose.Types.ObjectId(req.params.id) } } }
            );
        res.json({ message: 'Venta de curso eliminada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar venta de curso', error: error.message });
    }
});

// VentaMatricula routes
app.get('/api/ventamatricula', async (req, res) => {
    try {
        const matriculas = await mongoose.connection.db
            .collection('ventamatricula')
            .find({})
            .toArray();

        const formattedMatriculas = matriculas.map(matricula => ({
            cliente: matricula.cliente,
            estudiante: matricula.estudiante,
            fecha_inicio: matricula.fecha_inicio,
            fecha_fin: matricula.fecha_fin
        }));

        res.json(formattedMatriculas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener matrículas', error: error.message });
    }
});

app.put('/api/ventamatricula/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventamatricula')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Matrícula actualizada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar matrícula', error: error.message });
    }
});

app.delete('/api/ventamatricula/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('ventamatricula')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Matrícula eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar matrícula', error: error.message });
    }
});

// Aulas routes
app.get('/api/aulas', async (req, res) => {
    try {
        const aulas = await mongoose.connection.db
            .collection('aulas')
            .find({})
            .toArray();

        const formattedAulas = aulas.map(aula => ({
            nombre: aula.nombre,
            capacidad: aula.capacidad,
            ubicacion: aula.ubicacion,
            estado: aula.estado
        }));

        res.json(formattedAulas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener aulas', error: error.message });
    }
});

app.put('/api/aulas/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('aulas')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Aula actualizada', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar aula', error: error.message });
    }
});

app.delete('/api/aulas/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('aulas')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Aula eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar aula', error: error.message });
    }
});

// Usuarios routes
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await mongoose.connection.db
            .collection('usuarios')
            .find({})
            .toArray();

        const formattedUsuarios = usuarios.map(usuario => ({
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            correo: usuario.correo,
            rol: usuario.rol,
            estado: usuario.estado
        }));

        res.json(formattedUsuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('usuarios')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Usuario actualizado', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});

app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('usuarios')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Asistencia POST route
app.post('/api/asistencia', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .insertOne(req.body);
        res.json({ message: 'Asistencia creada', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear asistencia', error: error.message });
    }
});

// VentaCurso POST route
app.post('/api/ventacurso', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventacurso')
            .updateOne(
                {},
                { $push: { venta_cursos: req.body } },
                { upsert: true }
            );
        res.json({ message: 'Venta de curso creada', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear venta de curso', error: error.message });
    }
});

// VentaMatricula POST route
app.post('/api/ventamatricula', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('ventamatricula')
            .insertOne(req.body);
        res.json({ message: 'Matrícula creada', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear matrícula', error: error.message });
    }
});

// Aulas POST route
app.post('/api/aulas', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('aulas')
            .insertOne(req.body);
        res.json({ message: 'Aula creada', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear aula', error: error.message });
    }
});

// Usuarios POST route
app.post('/api/usuarios', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('usuarios')
            .insertOne(req.body);
        res.json({ message: 'Usuario creado', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
});