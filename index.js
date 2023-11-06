require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Crear el servidor de express
const app = express();

// Config CORS
app.use(cors())

// Read and parse body
app.use(express.json());

// Start BBDD
dbConnection()

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'))

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

