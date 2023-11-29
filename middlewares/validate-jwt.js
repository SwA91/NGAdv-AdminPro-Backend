const { response } = require('express');
const jwt = require('jsonwebtoken');
const { TypeHeader, TypeRole, TypeParamsQS } = require('../enum/shared.enum');
const User = require('../models/user');

const validateAdminRoleOrSameUser = async (req, res = response, next) => {

    const uid = req[TypeParamsQS.UID];
    const id = req.params[TypeParamsQS.ID];

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if (userDB.role === TypeRole.ADMIN_ROLE || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'You do not have enough privileges'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const validateAdminRole = async (req, res = response, next) => {

    const uid = req[TypeParamsQS.UID];

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if (userDB.role !== TypeRole.ADMIN_ROLE) {
            return res.status(403).json({
                ok: false,
                msg: 'You do not have enough privileges'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Unexpected error, contact your administrator'
        });
    }
}

const validateJWT = (req, res = response, next) => {

    // read token
    const token = req.header(TypeHeader.TOKEN);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token required'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        });
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser,
}