const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const retornaImagen = async (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // image default
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }

    // console.log(`retornaImagen: ${pathImg}`);

    res.sendFile(pathImg);
}
const fileUpload = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: `fileUpload > error: no se reconoce el tipo '${tabla}'`
        });
    }

    // validate exist a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: `fileUpload > error: no hay ningun archivo'`
        });
    }

    // process image
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validate extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: `fileUpload > error: extension no permitida '${extensionArchivo}'`
        });
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // generate path for save image
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function (err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: `fileUpload > error: no se pudo mover la imagen`
            });
        }

        // update bbdd
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });
    });
}

module.exports = {
    fileUpload,
    retornaImagen
}