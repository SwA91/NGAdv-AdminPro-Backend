require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors');
const { TypeAPI } = require('./enum/shared.enum');
const path = require('path');

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

// Routes
app.use(`/${TypeAPI.API}/${TypeAPI.USERS}`, require('./routes/users'));
app.use(`/${TypeAPI.API}/${TypeAPI.HOSPITALS}`, require('./routes/hospitals'));
app.use(`/${TypeAPI.API}/${TypeAPI.DOCTORS}`, require('./routes/doctors'));
app.use(`/${TypeAPI.API}/${TypeAPI.ALL}`, require('./routes/search'));
app.use(`/${TypeAPI.API}/${TypeAPI.UPLOADS}`, require('./routes/uploads'));
app.use(`/${TypeAPI.API}/${TypeAPI.LOGIN}`, require('./routes/auth'));
// latest
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Server running in the port: ' + process.env.PORT);
});

