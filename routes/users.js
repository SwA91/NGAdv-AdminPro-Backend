/**
 * Ruta: /api/users
 */
const { Router } = require('express');
const { getUsers, createUser, updateUser, borrarUsuario } = require('../controllers/users');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    createUser
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    updateUser
);

router.delete('/:id',
    validateJWT,
    borrarUsuario
);

module.exports = router;