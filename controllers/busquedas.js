const { response } = require('express');
const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const reqex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ name: reqex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitales':
            data = await Hospital.find({ name: reqex })
                .populate('user', 'name img');;
            break;
        case 'users':
            data = await User.find({ name: reqex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: `getDocumentosColeccion > error: no se reconoce la tabla '${tabla}'`
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const reqex = new RegExp(busqueda, 'i');

    const [users, medicos, hospitales] = await Promise.all([
        User.find({ name: reqex }),
        Medico.find({ name: reqex }),
        Hospital.find({ name: reqex })
    ]);

    res.json({
        ok: true,
        users,
        medicos,
        hospitales
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}