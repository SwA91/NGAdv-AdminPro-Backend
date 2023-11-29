const { response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const { TypeParamsQS, TypeTable } = require('../enum/shared.enum');

const getColecction = async (req, res = response) => {

    const search = req.params[TypeParamsQS.SEARCH];
    const typeTable = req.params[TypeParamsQS.TABLE];
    const reqex = new RegExp(search, 'i');
    let result = [];

    switch (typeTable) {
        case TypeTable.DOCTORS:
            result = await Doctor.find({ name: reqex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');
            break;
        case TypeTable.HOSPITALS:
            result = await Hospital.find({ name: reqex })
                .populate('user', 'name img');;
            break;
        case TypeTable.USERS:
            result = await User.find({ name: reqex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: `'${typeTable}' table not recognized`
            });
    }

    res.json({
        ok: true,
        result
    });
}

const getAll = async (req, res = response) => {

    const search = req.params[TypeParamsQS.SEARCH];
    const reqex = new RegExp(search, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: reqex }),
        Doctor.find({ name: reqex }),
        Hospital.find({ name: reqex })
    ]);

    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });
}

module.exports = {
    getAll,
    getColecction
}