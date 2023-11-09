const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const tokenJWT = await generarJWT(uid);

    res.json({
        ok: true,
        tokenJWT
    });
}

const googleSignIn = async (req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@',
                img: picture,
                google: true
            });
        } else {
            // Existe en la BBDD
            usuario = usuarioDB;
            usuario.google = true;
            /**
             * Si piso la contraseña
             * El usuario ya no podra
             * iniciar sesion de la manera tradicional
             * sino solo por google
             */
            // usuario.password = '@@';
        }

        // save user
        await usuario.save();

        // generar JWT
        const tokenJWT = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token: tokenJWT
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: 'googleSignIn > error: cannot validate token google'
        })
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email })

        // verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email o password no valido'
            })
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'email o password no valido'
            })
        }

        // generar el token - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
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

module.exports = {
    login,
    googleSignIn,
    renewToken
}