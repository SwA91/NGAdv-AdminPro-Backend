const { response } = require('express');
const Hospital = require('../models/hospital');
const { TypeParamsQS } = require('../enum/shared.enum');

const getHospitals = async (req, res = response) => {

    const [hospitals, total] = await Promise.all([
        Hospital.find().populate('user', 'name img'),
        Hospital.count()
    ]);

    res.json({
        ok: true,
        hospitals,
        total
    });
}

const createHospital = async (req, res = response) => {

    const uid = req[TypeParamsQS.UID];
    const newHospital = new Hospital({ user: uid, ...req.body });

    try {

        const hospital = await newHospital.save();

        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const updateHospital = async (req, res = response) => {

    const idHospital = req.params[TypeParamsQS.ID];
    const idUsuario = req[TypeParamsQS.UID];

    try {

        const hospitalDB = await Hospital.findById(idHospital);

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const changesHospital = {
            ...req.body,
            user: idUsuario
        }

        const hospital = await Hospital.findByIdAndUpdate(
            idHospital,
            changesHospital,
            { new: true }
        );

        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const deleteHospital = async (req, res = response) => {

    const idHospital = req.params[TypeParamsQS.ID];

    try {

        const hospitalDB = await Hospital.findById(idHospital);

        if (!hospitalDB) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(idHospital);

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}