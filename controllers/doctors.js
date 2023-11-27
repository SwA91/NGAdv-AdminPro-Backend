const { response } = require('express');
const Doctor = require('../models/doctor');
const { TypeParamsQS } = require('../enum/shared.enum');

const getDoctors = async (req, res = response) => {

    const result = await Doctor.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');

    res.json({
        ok: true,
        result
    });
}

const createDoctor = async (req, res = response) => {

    const uid = req[TypeParamsQS.UID];
    const newDoctor = new Doctor({
        user: uid,
        ...req.body
    });

    try {

        const doctor = await newDoctor.save();

        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const updateDoctor = async (req, res = response) => {

    const idDoctor = req.params[TypeParamsQS.ID];
    const idUsuario = req[TypeParamsQS.UID];

    try {

        const doctorDB = await Doctor.findById(idDoctor);

        if (!doctorDB) {
            res.status(404).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        const changesDoctor = {
            ...req.body,
            user: idUsuario
        }

        const doctor = await Doctor.findByIdAndUpdate(
            idDoctor,
            changesDoctor,
            { new: true }
        );

        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }

}

const deleteDoctor = async (req, res = response) => {

    const idDoctor = req.params[TypeParamsQS.ID];

    try {

        const doctorDB = await Doctor.findById(idDoctor);

        if (!doctorDB) {
            res.status(404).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        await Doctor.findByIdAndDelete(idDoctor);

        res.json({
            ok: true,
            msg: 'Doctor deleted'
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}