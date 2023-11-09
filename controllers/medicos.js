const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'crearMedico > error: revisar logs'
        });
    }
}

const actualizarMedico = async (req, res = response) => {

    const idMedico = req.params.id;
    const idUsuario = req.uid;

    try {

        const medico = await Medico.findById(idMedico);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: idUsuario
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(
            idMedico,
            cambiosMedico,
            { new: true }
        );

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'actualizarMedico > error: hable con el administrador'
        });
    }

}

const borrarrMedico = async(req, res = response) => {

    const idMedico = req.params.id;

    try {

        const medico = await Medico.findById(idMedico);

        if (!medico) {
            res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            });
        }

        await Medico.findByIdAndDelete(idMedico);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'borrarrMedico > error: hable con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarrMedico
}