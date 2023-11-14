const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { TypeParamsQS } = require('../enum/shared.enum');

const getUsers = async (req, res = response) => {

    const from = Number(req.query[TypeParamsQS.FROM]) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img').skip(from).limit(5),
        User.count()
    ]);

    res.json({
        ok: true,
        users,
        total
    });

}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already registered'
            })
        }

        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        // Guardar user
        await user.save();

        // generar el token - JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar logs'
        });
    }
}

const updateUser = async (req, res = response) => {

    // TODO: validar token y comprobar si es el user correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        // actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un user con ese email'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            user: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar logs'
        });
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un user por ese id'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'user eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado, revisar logs'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    borrarUsuario
}