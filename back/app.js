const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const mainRoutes = require('./rutas/index');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

app.use(express.static("public"));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
  };

// Seguridad y logging
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));


// Rutas principales
app.use('/api', mainRoutes);

// Middleware para manejo de errores 404 (No encontrado)
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Middleware para manejar todos los errores
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
