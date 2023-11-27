const User = require('../models/user');
const Medico = require('../models/doctor');
const Hospital = require('../models/hospital');
const fs = require('fs');
const { TypeTable, TypeAPI } = require('../enum/shared.enum');

const removeImage = (path) => {
    if (fs.existsSync(path)) {
        // delete old image
        fs.unlinkSync(path);
    }
}

const updateImage = async (typeTable, idEntity, nameFile) => {

    let entity = null;

    switch (typeTable) {

        case TypeTable.DOCTORS:
            entity = await Medico.findById(idEntity);
            break;

        case TypeTable.HOSPITALS:
            entity = await Hospital.findById(idEntity);
            break;

        case TypeTable.USERS:
            entity = await User.findById(idEntity);
            break;

        default:
            break;
    }

    if (!entity) {
        console.log(`There is nothing for:`, { typeTable, idEntity });
        return Promise.reject(false);
    }

    switch (typeTable) {

        case TypeTable.DOCTORS:
            removeImage(`./${TypeAPI.UPLOADS}/${TypeTable.DOCTORS}/${entity.img}`);
            break;

        case TypeTable.HOSPITALS:
            removeImage(`./${TypeAPI.UPLOADS}/${TypeTable.HOSPITALS}/${entity.img}`);
            break;

        case TypeTable.USERS:
            removeImage(`./${TypeAPI.UPLOADS}/${TypeTable.USERS}/${entity.img}`);
            break;

        default:
            break;
    }


    entity.img = nameFile;
    await entity.save();
    Promise.resolve(true);
}

module.exports = {
    updateImage
}