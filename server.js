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
        // Get all documents from the asistencia collection
        const asistencias = await mongoose.connection.db
            .collection('asistencia')
            .find({})
            .toArray();

        // Format the response data
        const formattedAsistencias = asistencias.map(asistencia => ({
            nombre_estudiante: asistencia.nombre_estudiante,
            apellido_estudiante: asistencia.apellido_estudiante,
            fecha: asistencia.fecha,
            hora: asistencia.hora,
            profesor: asistencia.profesor
        }));

        res.json(formattedAsistencias);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Error al obtener asistencia', 
            error: error.message 
        });
    }
});

// POST route for adding new asistencia
app.post('/api/asistencia', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .updateOne(
                {}, // empty filter to match first document
                { $push: { asistencia: req.body } },
                { upsert: true }
            );
        
        res.json(req.body);
    } catch (error) {
        console.error('Error adding asistencia:', error);
        res.status(500).json({ 
            message: 'Error al crear asistencia', 
            error: error.message 
        });
    }
});

app.put('/api/asistencia/:id', async (req, res) => {
    try {
        const asistencia = await Asistencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        res.json(asistencia);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar asistencia', error: error.message });
    }
});

app.delete('/api/asistencia/:id', async (req, res) => {
    try {
        const asistencia = await Asistencia.findByIdAndDelete(req.params.id);
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        res.json({ message: 'Asistencia eliminada correctamente' });
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
// Asistencia route
app.get('/api/asistencia', async (req, res) => {
    try {
        // Get direct access to the collection
        const collection = mongoose.connection.db.collection('asistencia');
        
        // Find all documents in the collection
        const documents = await collection.find().toArray();
        console.log('Raw documents found:', documents);
        
        // If we found any document, return its asistencia array
        if (documents && documents.length > 0) {
            const firstDoc = documents[0];
            console.log('First document:', firstDoc);
            res.json(firstDoc.asistencia || []);
        } else {
            console.log('No documents found in asistencia collection');
            res.json([]);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Error al obtener asistencia', 
            error: error.message 
        });
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

// Add this test route to see raw database contents
app.get('/api/test/asistencia', async (req, res) => {
    try {
        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        // Get raw data from asistencia collection
        const data = await mongoose.connection.db
            .collection('asistencia')
            .aggregate([
                { $project: { _id: 1, asistencia: 1 } }
            ]).toArray();
        
        res.json({
            collections: collections.map(c => c.name),
            rawData: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Updated GET route for asistencia
app.get('/api/asistencia', async (req, res) => {
    try {
        // Use the raw MongoDB driver to query
        const result = await mongoose.connection.db
            .collection('asistencia')
            .findOne({ _id: new mongoose.Types.ObjectId("67e6c2fe10365dfe08a5511d") });
        
        console.log('Raw database result:', result);
        
        if (!result) {
            console.log('No data found');
            return res.json([]);
        }
        
        res.json(result.asistencia || []);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Error al obtener asistencias', 
            error: error.message 
        });
    }
});

// Add this diagnostic route
app.get('/api/check', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        // Try to get data from asistencia collection
        const asistenciaData = await db.collection('asistencia').find().toArray();
        console.log('Asistencia data:', asistenciaData);
        
        res.json({
            collections: collections.map(c => c.name),
            asistenciaData: asistenciaData
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});