/**
 * Hospitales
 * Path: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarrHospital
} = require('../controllers/hospitales');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getHospitales);

router.post('/',
    [
        validateJWT,
        check('name', 'El name del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    crearHospital
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'El name del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    actualizarHospital
);

router.delete('/:id',
    validateJWT,
    borrarrHospital
);

module.exports = router;