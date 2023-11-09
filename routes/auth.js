/**
 * Path: '/api/login'
 */
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/renew',
    validarJWT,
    renewToken
);

router.post('/google',
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

module.exports = router;