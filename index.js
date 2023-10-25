require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Crear el servidor de express
const app = express();

// Config CORS
app.use(cors())

// Start BBDD
dbConnection()

// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});

