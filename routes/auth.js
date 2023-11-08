/**
 * Path: '/api/login'
 */
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

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