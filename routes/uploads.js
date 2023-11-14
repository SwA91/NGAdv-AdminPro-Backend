/**
 * Ruta: /api/uploads/users/
 */
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImage } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');
const { TypeParamsQS } = require('../enum/shared.enum');

const router = Router();

router.use(expressFileUpload());

router.put(`/:${TypeParamsQS.TYPE}/:${TypeParamsQS.ID}`, validateJWT, fileUpload);
router.get(`/:${TypeParamsQS.TYPE}/:${TypeParamsQS.PHOTO}`, returnImage);

module.exports = router;