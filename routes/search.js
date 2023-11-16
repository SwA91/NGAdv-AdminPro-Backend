/**
 * Ruta: /api/todo/
 */
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getTodo, getColecction } = require('../controllers/search');
const { TypeParamsQS, TypeAPI } = require('../enum/shared.enum');
const router = Router();

router.get(`/:${TypeParamsQS.SEARCH}`, validateJWT, getTodo);

router.get(`/${TypeAPI.COLLECTION}/:${TypeParamsQS.TABLE}/:${TypeParamsQS.SEARCH}`, validateJWT, getColecction);

module.exports = router;