const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs')

const removeImage = (path) => {
    if (fs.existsSync(path)) {
        // delete old image
        fs.unlinkSync(path);
    }
}

const updateImage = async (tipo, id, nombreArchivo) => {

    let entity = null;

    switch (tipo) {
        case 'medicos':
            entity = await Medico.findById(id);
            if (!entity) {
                console.log(`No se encontro nada con el id: ${id}`);
                return false;
            }

            removeImage(`./uploads/medicos/${entity.img}`);

            entity.img = nombreArchivo;
            await entity.save();

            return true;
            break;

        case 'hospitales':

            entity = await Hospital.findById(id);
            if (!entity) {
                console.log(`No se encontro nada con el id: ${id}`);
                return false;
            }

            removeImage(`./uploads/hospitales/${entity.img}`);

            entity.img = nombreArchivo;
            await entity.save();

            return true;
            break;

        case 'users':
            entity = await User.findById(id);
            if (!entity) {
                console.log(`No se encontro nada con el id: ${id}`);
                return false;
            }

            removeImage(`./uploads/users/${entity.img}`);

            entity.img = nombreArchivo;
            await entity.save();

            return true;
            break;

        default:
            break;
    }

}

module.exports = {
    updateImage
}