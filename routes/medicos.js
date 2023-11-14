/**
 * Hospitales
 * Path: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarrMedico
} = require('../controllers/medicos');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validateJWT,
        check('name', 'El name del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe de ser valido').isMongoId(),
        validateFields
    ],
    crearMedico
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'El name del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe de ser valido').isMongoId(),
        validateFields
    ],
    actualizarMedico
);

router.delete('/:id',
    validateJWT,
    borrarrMedico
);

module.exports = router;