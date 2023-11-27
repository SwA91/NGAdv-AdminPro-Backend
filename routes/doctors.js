/**
 * Hospitales
 * Path: /api/doctors
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById } = require('../controllers/doctors');
const { validateFields } = require('../middlewares/validate-fields');
const { TypeParamsQS } = require('../enum/shared.enum');

const router = Router();

router.get('/', validateJWT, getDoctors);

router.get(`/:${TypeParamsQS.ID}`,
    validateJWT,
    getDoctorById
);

router.post('/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('hospital', 'The hospital ID must be valid').isMongoId(),
        validateFields
    ],
    createDoctor
);

router.put(`/:${TypeParamsQS.ID}`,
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('hospital', 'The hospital ID must be valid').isMongoId(),
        validateFields
    ],
    updateDoctor
);

router.delete(`/:${TypeParamsQS.ID}`,
    validateJWT,
    deleteDoctor
);

module.exports = router;