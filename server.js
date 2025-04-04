const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const responseHandler = require('./middleware/responseHandler');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(responseHandler);

// Define routes
const clientesRouter = require('./routes/clientes');

// Use routes
app.use('/api/clientes', clientesRouter);

// Import models
const Cliente = require('./models/Cliente');
const Asistencia = require('./models/Asistencia');
const Aula = require('./models/Aula');
const Estudiante = require('./models/Estudiante');
const Profesor = require('./models/Profesor');
const User = require('./models/User');
const VentaCurso = require('./models/VentaCurso');
const VentaMatricula = require('./models/VentaMatricula');

// MongoDB connection is handled in config/db.js

// Asistencia Routes
// Remove this duplicate route (it appears twice in your code)
app.get('/api/asistencia', async (req, res, next) => {
    try {
        const asistencias = await mongoose.connection.db
            .collection('asistencia')
            .find({})
            .toArray();

        const formattedAsistencias = asistencias.map(asistencia => ({
            id: asistencia._id,
            nombre_estudiante: asistencia.nombre_estudiante,
            apellido_estudiante: asistencia.apellido_estudiante,
            fecha: asistencia.fecha,
            hora: asistencia.hora,
            profesor: asistencia.profesor
        }));

        res.success(formattedAsistencias, 'Asistencias obtenidas exitosamente');
    } catch (error) {
        next(error);
}});

app.post('/api/asistencia', async (req, res, next) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .insertOne(req.body);
        res.success(result.ops[0], 'Asistencia creada exitosamente', 201);
    } catch (error) {
        next(error);
    }
});

app.put('/api/asistencia/:id', async (req, res, next) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        if (result.matchedCount === 0) {
            return res.error('Asistencia no encontrada', 404);
        }
        res.success({ updated: true }, 'Asistencia actualizada exitosamente');
    } catch (error) {
        next(error);
    }
});

app.delete('/api/asistencia/:id', async (req, res, next) => {
    try {
        const result = await mongoose.connection.db
            .collection('asistencia')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.error('Asistencia no encontrada', 404);
        }
        res.success(null, 'Asistencia eliminada exitosamente');
    } catch (error) {
        next(error);
    }
});

// Profesores Routes
app.get('/api/profesores', async (req, res, next) => {
    try {
        const profesores = await mongoose.connection.db
            .collection('profesores')
            .find({})
            .toArray();
        res.success(profesores, 'Profesores obtenidos exitosamente');
    } catch (error) {
        next(error);
    }
});

app.post('/api/profesores', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('profesores')
            .insertOne(req.body);
        res.json({ message: 'Profesor creado', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear profesor', error: error.message });
    }
});

app.put('/api/profesores/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('profesores')
            .updateOne(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { $set: req.body }
            );
        res.json({ message: 'Profesor actualizado', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar profesor', error: error.message });
    }
});

app.delete('/api/profesores/:id', async (req, res) => {
    try {
        await mongoose.connection.db
            .collection('profesores')
            .deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ message: 'Profesor eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar profesor', error: error.message });
    }
});

// VentaCurso Routes
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

// VentaMatricula Routes
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

// Aulas Routes
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

// Usuarios Routes
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

// Cliente Routes
app.get('/api/cliente', async (req, res) => {
    try {
        // Get direct access to the collection
        const collection = mongoose.connection.db.collection('cliente');
        
        // Find all documents and log them
        const documents = await collection.find().toArray();
        console.log('Raw documents found:', documents);
        
        // If we found any documents, process them
        if (documents && documents.length > 0) {
            const firstDoc = documents[0];
            console.log('First document:', firstDoc);
            
            if (firstDoc.clientes && Array.isArray(firstDoc.clientes)) {
                res.json(firstDoc.clientes);
            } else {
                console.log('No clientes array found in document');
                res.json([]);
            }
        } else {
            console.log('No documents found in cliente collection');
            res.json([]);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            message: 'Error al obtener clientes', 
            error: error.message 
        });
    }
});

app.post('/api/cliente', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('cliente')
            .updateOne(
                {},
                { $push: { clientes: req.body } },
                { upsert: true }
            );
        res.json({ message: 'Cliente creado', data: req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente', error: error.message });
    }
});

app.put('/api/cliente/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('cliente')
            .updateOne(
                { "clientes._id": new mongoose.Types.ObjectId(req.params.id) },
                { $set: { "clientes.$": req.body } }
            );
        res.json({ message: 'Cliente actualizado', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
    }
});

app.delete('/api/cliente/:id', async (req, res) => {
    try {
        const result = await mongoose.connection.db
            .collection('cliente')
            .updateOne(
                {},
                { $pull: { clientes: { _id: new mongoose.Types.ObjectId(req.params.id) } } }
            );
        res.json({ message: 'Cliente eliminado', result });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
    }
});

// Add this temporary diagnostic route
app.get('/api/debug/collections', async (req, res) => {
    try {
        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        // Try to find the cliente collection (case insensitive)
        const clienteCollection = collections.find(c => 
            c.name.toLowerCase().includes('client') || 
            c.name.toLowerCase().includes('clientes')
        );
        
        if (clienteCollection) {
            // If found, query that collection
            const data = await mongoose.connection.db
                .collection(clienteCollection.name)
                .find()
                .toArray();
            console.log('Data in collection:', data);
        }
        
        res.json({
            collections: collections.map(c => c.name),
            clienteCollection: clienteCollection ? clienteCollection.name : null
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