const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend');

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    const user = await User.findById(uid);


    res.json({
        ok: true,
        token,
        user,
        menu: getMenuFrontend(user.role)
    });
}

const googleSignIn = async (req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await User.findOne({ email });
        let user;

        if (!usuarioDB) {
            user = new User({
                name: name,
                email,
                password: '@@',
                img: picture,
                google: true
            });
        } else {
            // Existe en la BBDD
            user = usuarioDB;
            user.google = true;
            /**
             * Si piso la contraseña
             * El user ya no podra
             * iniciar sesion de la manera tradicional
             * sino solo por google
             */
            // user.password = '@@';
        }

        // save user
        await user.save();

        // generar JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(user.role)
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: 'error: cannot validate token google'
        })
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email })

        // verificar email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email or password no valid'
            })
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'email or password no valid'
            })
        }

        // generar el token - JWT
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(userDB.role)
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