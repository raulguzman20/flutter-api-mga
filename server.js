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
        res.status(500).json({ message: 'Error al crear el profesor', error: error.message });
    }
});

// Ruta para listar todos los profesores
app.get('/api/profesores', async (req, res) => {
    try {
        const profesores = await Profesor.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profesores', error: error.message });
    }
});

// Rutas para usuarios
app.post('/api/usuarios', async (req, res) => {
    try {
        const usuario = new User(req.body);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

// Ruta para listar todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// Rutas para ventas de cursos
app.post('/api/ventacurso', async (req, res) => {
    try {
        const ventaCurso = new VentaCurso(req.body);
        await ventaCurso.save();
        res.json(ventaCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta del curso', error: error.message });
    }
});

// Ruta para listar todas las ventas de cursos
app.get('/api/ventacurso', async (req, res) => {
    try {
        const ventasCursos = await VentaCurso.find();
        res.json(ventasCursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas de cursos', error: error.message });
    }
});

// Rutas para ventas de matrículas
app.post('/api/ventamatricula', async (req, res) => {
    try {
        const ventaMatricula = new VentaMatricula(req.body);
        await ventaMatricula.save();
        res.json(ventaMatricula);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta de matrícula', error: error.message });
    }
});

// Ruta para listar todas las ventas de matrículas
app.get('/api/ventamatricula', async (req, res) => {
    try {
        const ventasMatriculas = await VentaMatricula.find();
        res.json(ventasMatriculas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas de matrículas', error: error.message });
    }
});

app.get('/', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const routes = [
            { path: '/', description: 'Página principal con información de la API' },
            { path: '/test', description: 'Prueba de conexión a la base de datos' }
        ];
        res.json({
            message: 'Bienvenido a la API de MGA',
            estado: 'API funcionando correctamente',
            colecciones_disponibles: collections.map(c => c.name),
            rutas_disponibles: routes
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener información', details: error.message });
    }
});

// Test route (moved outside of app.listen)
app.get('/test', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({ message: 'Database connected!', collections: collections.map(c => c.name) });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Add this route to check your database collections
app.get('/api/debug', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        res.json({
            collections: collectionNames,
            dbName: mongoose.connection.db.databaseName
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});