require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors');
const { TypeAPI } = require('./enum/shared.enum');

// Crear el servidor de express
const app = express();

// Config CORS
app.use(cors())

// Folder public
app.use(express.static('public'));

// Read and parse body
app.use(express.json());

// Start BBDD
dbConnection()

// Rutas
app.use(`/${TypeAPI.API}/${TypeAPI.USERS}`, require('./routes/users'));
app.use(`/${TypeAPI.API}/${TypeAPI.HOSPITALS}`, require('./routes/hospitales'));
app.use(`/${TypeAPI.API}/${TypeAPI.DOCTORS}`, require('./routes/medicos'));
app.use(`/${TypeAPI.API}/${TypeAPI.ALL}`, require('./routes/search'));
app.use(`/${TypeAPI.API}/${TypeAPI.UPLOADS}`, require('./routes/uploads'));
app.use(`/${TypeAPI.API}/${TypeAPI.LOGIN}`, require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});

