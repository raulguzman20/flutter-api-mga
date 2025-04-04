const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Obtener todos los clientes
router.get('/', async (req, res, next) => {
    try {
        const clientes = await Cliente.find();
        res.success(clientes, 'Clientes obtenidos exitosamente');
    } catch (error) {
        next(error);
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res, next) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.success(cliente, 'Cliente creado exitosamente', 201);
    } catch (error) {
        next(error);
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res, next) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.error('Cliente no encontrado', 404);
        }
        res.success(cliente, 'Cliente encontrado exitosamente');
    } catch (error) {
        next(error);
    }
});

// Actualizar un cliente
router.put('/:id', async (req, res, next) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) {
            return res.error('Cliente no encontrado', 404);
        }
        res.success(cliente, 'Cliente actualizado exitosamente');
    } catch (error) {
        next(error);
    }
});

// Eliminar un cliente
router.delete('/:id', async (req, res, next) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.error('Cliente no encontrado', 404);
        }
        res.success(null, 'Cliente eliminado exitosamente');
    } catch (error) {
        next(error);
    }
});

module.exports = router;