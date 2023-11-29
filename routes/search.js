/**
 * Ruta: /api/todo/
 */
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll, getColecction } = require('../controllers/search');
const { TypeParamsQS, TypeAPI } = require('../enum/shared.enum');
const router = Router();

router.get(`/:${TypeParamsQS.SEARCH}`, validateJWT, getAll);

router.get(`/${TypeAPI.COLLECTION}/:${TypeParamsQS.TABLE}/:${TypeParamsQS.SEARCH}`, validateJWT, getColecction);

module.exports = router;