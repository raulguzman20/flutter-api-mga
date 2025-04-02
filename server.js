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
        res.status(500).json({ message: 'Error al crear profesor', error: error.message });
    }
});

// Ruta para listar todos los profesores
app.get('/api/profesores', async (req, res) => {
    try {
        console.log('Fetching profesores...');
        const profesores = await Profesor.find();
        console.log('Profesores found:', profesores);
        res.json(profesores);
    } catch (error) {
        console.error('Error fetching profesores:', error);
        res.status(500).json({ message: 'Error al obtener profesores', error: error.message });
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
        const formattedVentas = ventasMatriculas.map(venta => {
            return {
                _id: venta._id,
                cliente: venta.cliente || 'Sin cliente',
                estudiante: venta.estudiante || 'Sin estudiante',
                fecha_inicio: venta.fecha_inicio ? venta.fecha_inicio.toISOString().split('T')[0] : '',
                fecha_fin: venta.fecha_fin ? venta.fecha_fin.toISOString().split('T')[0] : ''
            };
        });
        res.json(formattedVentas);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ 
            message: 'Error al obtener las ventas de matrículas', 
            error: error.message 
        });
    }
});

// POST route for ventamatricula
app.post('/api/ventamatricula', async (req, res) => {
    try {
        const ventaMatricula = new VentaMatricula({
            cliente: req.body.cliente,
            estudiante: req.body.estudiante,
            fecha_inicio: new Date(req.body.fecha_inicio),
            fecha_fin: new Date(req.body.fecha_fin)
        });
        await ventaMatricula.save();
        const formatted = {
            cliente: ventaMatricula.cliente,
            estudiante: ventaMatricula.estudiante,
            fecha_inicio: ventaMatricula.fecha_inicio.toISOString().split('T')[0],
            fecha_fin: ventaMatricula.fecha_fin.toISOString().split('T')[0]
        };
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta de matrícula', error: error.message });
    }
});

// Clientes - Delete and Update routes
app.delete('/api/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
});

app.put('/api/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
});

// Asistencias - Delete and Update routes
app.delete('/api/asistencias/:id', async (req, res) => {
    try {
        const asistencia = await Asistencia.findByIdAndDelete(req.params.id);
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        res.json({ message: 'Asistencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la asistencia', error: error.message });
    }
});

app.put('/api/asistencias/:id', async (req, res) => {
    try {
        const asistencia = await Asistencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }
        res.json(asistencia);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la asistencia', error: error.message });
    }
});

// Aulas - Delete and Update routes
app.delete('/api/aulas/:id', async (req, res) => {
    try {
        const aula = await Aula.findByIdAndDelete(req.params.id);
        if (!aula) {
            return res.status(404).json({ message: 'Aula no encontrada' });
        }
        res.json({ message: 'Aula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el aula', error: error.message });
    }
});

app.put('/api/aulas/:id', async (req, res) => {
    try {
        const aula = await Aula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aula) {
            return res.status(404).json({ message: 'Aula no encontrada' });
        }
        res.json(aula);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el aula', error: error.message });
    }
});

// Estudiantes - Delete and Update routes
app.delete('/api/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el estudiante', error: error.message });
    }
});

app.put('/api/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estudiante', error: error.message });
    }
});

// Profesores - Delete and Update routes
app.delete('/api/profesores/:id', async (req, res) => {
    try {
        const profesor = await Profesor.findByIdAndDelete(req.params.id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json({ message: 'Profesor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
    }
});

app.put('/api/profesores/:id', async (req, res) => {
    try {
        const profesor = await Profesor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el profesor', error: error.message });
    }
});

// Usuarios - Delete and Update routes
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});

app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
});

// VentaCurso - Delete and Update routes
app.delete('/api/ventacurso/:id', async (req, res) => {
    try {
        const ventaCurso = await VentaCurso.findByIdAndDelete(req.params.id);
        if (!ventaCurso) {
            return res.status(404).json({ message: 'Venta de curso no encontrada' });
        }
        res.json({ message: 'Venta de curso eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta del curso', error: error.message });
    }
});

app.put('/api/ventacurso/:id', async (req, res) => {
    try {
        const ventaCurso = await VentaCurso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ventaCurso) {
            return res.status(404).json({ message: 'Venta de curso no encontrada' });
        }
        res.json(ventaCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la venta del curso', error: error.message });
    }
});

// VentaMatricula - Delete and Update routes
app.delete('/api/ventamatricula/:id', async (req, res) => {
    try {
        const ventaMatricula = await VentaMatricula.findByIdAndDelete(req.params.id);
        if (!ventaMatricula) {
            return res.status(404).json({ message: 'Venta de matrícula no encontrada' });
        }
        res.json({ message: 'Venta de matrícula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta de matrícula', error: error.message });
    }
});

app.put('/api/ventamatricula/:id', async (req, res) => {
    try {
        const ventaMatricula = await VentaMatricula.findByIdAndUpdate(
            req.params.id,
            {
                cliente: req.body.cliente,
                estudiante: req.body.estudiante,
                fecha_inicio: new Date(req.body.fecha_inicio),
                fecha_fin: new Date(req.body.fecha_fin)
            },
            { new: true }
        );
        if (!ventaMatricula) {
            return res.status(404).json({ message: 'Venta de matrícula no encontrada' });
        }
        const formatted = {
            cliente: ventaMatricula.cliente,
            estudiante: ventaMatricula.estudiante,
            fecha_inicio: ventaMatricula.fecha_inicio.toISOString().split('T')[0],
            fecha_fin: ventaMatricula.fecha_fin.toISOString().split('T')[0]
        };
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la venta de matrícula', error: error.message });
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