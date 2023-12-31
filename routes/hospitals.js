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
const { TypeParamsQS } = require('../enum/shared.enum');

const router = Router();

router.get('/', getHospitals);

router.post('/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put(`/:${TypeParamsQS.ID}`,
    [
        validateJWT,
        check('name', 'The name of the hospital is required').not().isEmpty(),
        validateFields
    ],
    updateHospital
);

router.delete(`/:${TypeParamsQS.ID}`,
    validateJWT,
    deleteHospital
);

module.exports = router;