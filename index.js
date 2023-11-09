require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors')

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
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

