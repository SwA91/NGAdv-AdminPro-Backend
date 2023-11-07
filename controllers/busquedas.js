const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const reqex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: reqex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: reqex })
                .populate('usuario', 'nombre img');;
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: reqex });
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

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: reqex }),
        Medico.find({ nombre: reqex }),
        Hospital.find({ nombre: reqex })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}