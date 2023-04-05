
let globalMiddlewareErr = (error, req, res, next) => {
    // error.statusCode = error.statusCode || 500

    if (process.env.MODE_ENV === 'development') {
        res.status(error.statusCode || 500).json({ message: error.message, statusCode: error.statusCode, stack: error.stack })
    }
    else {
        res.status(error.statusCode || 500).json({ message: error.message, statusCode: error.statusCode })
    }

}

module.exports = globalMiddlewareErr