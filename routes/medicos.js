/**
 * Hospitales
 * Path: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarrMedico
} = require('../controllers/medicos')

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('name', 'El name del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        validarJWT,
        check('name', 'El name del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe de ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',
    validarJWT,
    borrarrMedico
);

module.exports = router;