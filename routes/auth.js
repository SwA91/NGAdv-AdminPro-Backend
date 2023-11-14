/**
 * Path: '/api/login'
 */
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth')
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { TypeAPI } = require('../enum/shared.enum');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get(`/${TypeAPI.RENEW}`,
    validateJWT,
    renewToken
);

router.post(`/${TypeAPI.GOOGLE}`,
    [
        check('token', 'El token es obligatorio').not().isEmpty(),
        validateFields
    ],
    googleSignIn
);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;