const { response } = require('express');
const User = require('../models/user');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const { TypeParamsQS, TypeTable } = require('../enum/shared.enum');

const getColecction = async (req, res = response) => {

    const search = req.params[TypeParamsQS.SEARCH];
    const table = req.params[TypeParamsQS.TABLE];
    const reqex = new RegExp(search, 'i');
    let result = [];

    switch (table) {
        case 'medicos':
            result = await Medico.find({ name: reqex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case 'hospitales':
            result = await Hospital.find({ name: reqex })
                .populate('user', 'name img');;
            break;
        case TypeTable.USERS:
            result = await User.find({ name: reqex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: `'${table}' table not recognized`
            });
    }

    res.json({
        ok: true,
        result
    });
}

const getTodo = async (req, res = response) => {

    const search = req.params[TypeParamsQS.SEARCH];
    const reqex = new RegExp(search, 'i');

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
    getColecction
}