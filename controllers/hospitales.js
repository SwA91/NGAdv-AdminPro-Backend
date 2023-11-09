const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'crearHospital > error: hable con el administrador'
        });
    }
}

const actualizarHospital = async (req, res = response) => {

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
            usuario: idUsuario
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
            msg: 'actualizarHospital > error: hable con el administrador'
        });
    }
}

const borrarrHospital = async (req, res = response) => {

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
            msg: 'borrarrHospital > error: hable con el administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarrHospital
}