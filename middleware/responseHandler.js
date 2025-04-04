const responseHandler = (req, res, next) => {
    // Extender el objeto response con métodos personalizados
    res.success = function(data, message = 'Operación exitosa', statusCode = 200) {
        return this.status(statusCode).json({
            success: true,
            message,
            data
        });
    };

    res.error = function(message = 'Error en el servidor', statusCode = 500, errors = null) {
        const response = {
            success: false,
            message,
            timestamp: new Date().toISOString()
        };
        
        if (errors) {
            response.errors = errors;
        }

        return this.status(statusCode).json(response);
    };

    next();
};

module.exports = responseHandler;