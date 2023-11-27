const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const path = require('path');
const fs = require('fs');
const { TypeTable, TypeAPI, TypeImageAllowed, TypeParamsQS } = require('../enum/shared.enum');
const { log } = require('console');

const returnImage = async (req, res = response) => {
    const type = req.params[TypeParamsQS.TYPE];
    const photo = req.params[TypeParamsQS.PHOTO];
    let pathImg = path.join(__dirname, `../${TypeAPI.UPLOADS}/${type}/${photo}`);

    // image default
    if (!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../${TypeAPI.UPLOADS}/no-img.jpg`);
    }

    res.sendFile(pathImg);
}
const fileUpload = async (req, res = response) => {

    const typeTable = req.params[TypeParamsQS.TYPE];
    const id = req.params[TypeParamsQS.ID];

    if (!Object.values(TypeTable).includes(typeTable)) {
        return res.status(400).json({
            ok: false,
            msg: `Not recognized '${typeTable}'`
        });
    }

    // validate exist a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'There is no file'
        });
    }

    // process image
    const file = req.files.image;
    const nameShort = file.name.split('.');
    const fileExtension = nameShort[nameShort.length - 1];

    // validate extension
    if (!Object.values(TypeImageAllowed).includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: `Extension not allowed '${fileExtension}'`
        });
    }

    // generar el nombre del archivo
    const nameFile = `${uuidv4()}.${fileExtension}`;

    // generate path for save image
    const path = `./${TypeAPI.UPLOADS}/${typeTable}/${nameFile}`;
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function (err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: `Could not move the image`
            });
        }

        // update bbdd
        updateImage(typeTable, id, nameFile).then(() => {
            res.json({
                ok: true,
                msg: 'file successfully uploaded',
                nameFile
            });
        }).catch(() => {
            res.status(500).json({
                ok: false,
                msg: 'Unexpected error, contact your administrator'
            });
        });

    });
}

module.exports = {
    fileUpload,
    returnImage
}