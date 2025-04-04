const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Manejar errores de validación de Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => ({
            field: error.path,
            message: error.message
        }));
        return res.error('Error de validación', 400, errors);
    }

    // Manejar errores de duplicados de Mongoose
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.error(`El valor del campo ${field} ya existe`, 409);
    }

    // Manejar errores de casting de Mongoose
    if (err.name === 'CastError') {
        return res.error(`Valor inválido para ${err.path}`, 400);
    }

    // Error por defecto
    return res.error(err.message || 'Error interno del servidor');
};

module.exports = errorHandler;