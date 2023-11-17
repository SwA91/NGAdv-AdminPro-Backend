/**
 * Hospitals
 * Path: /api/hospitals
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', getHospitals);

router.post('/',
    [
        validateJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put('/:id',
    [
        validateJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        validateFields
    ],
    updateHospital
);

router.delete('/:id',
    validateJWT,
    deleteHospital
);

module.exports = router;