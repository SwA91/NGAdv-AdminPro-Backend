const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const returnImage = async (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // image default
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }

    // console.log(`returnImage: ${pathImg}`);

    res.sendFile(pathImg);
}
const fileUpload = async (req, res = response) => {

    const typeTable = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'users'];

    if (!tiposValidos.includes(typeTable)) {
        return res.status(400).json({
            ok: false,
            msg: `error: not recognized '${typeTable}'`
        });
    }

    // validate exist a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'error: there is no file'
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
            msg: `error: extension not allowed '${extensionArchivo}'`
        });
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // generate path for save image
    const path = `./uploads/${typeTable}/${nombreArchivo}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function (err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: `error: could not move the image`
            });
        }

        // update bbdd
        updateImage(typeTable, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'file successfully uploaded',
            nombreArchivo
        });
    });
}

module.exports = {
    fileUpload,
    returnImage
}