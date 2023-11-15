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

        const existEmail = await User.findOne({ email });

        if (existEmail) {
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
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const updateUser = async (req, res = response) => {

    const uid = req.params[TypeParamsQS.ID];

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'There is now user for this ID'
            });
        }

        // actualizaciones
        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {

            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is already a user with this Email'
                })
            }
        }

        // only user not google can update their email
        if (!userDB.google) {
            fields.email = email;
        } else if (userDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Google users cannot change their email address'
            })
        }

        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
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
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    borrarUsuario
}