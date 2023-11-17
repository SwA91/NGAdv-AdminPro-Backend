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

    const idHospital = req.params.id;
    const idUsuario = req.uid;

    try {

        const hospital = await Hospital.findById(idHospital);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            user: idUsuario
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(
            idHospital,
            cambiosHospital,
            { new: true }
        );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'updateHospital > error: hable con el administrador'
        });
    }
}

const deleteHospital = async (req, res = response) => {

    const idHospital = req.params.id;

    try {

        const hospital = await Hospital.findById(idHospital);

        if (!hospital) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete(idHospital);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'deleteHospital > error: hable con el administrador'
        });
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}