const { response } = require('express');
const jwt = require('jsonwebtoken');
const { TypeHeader } = require('../enum/shared.enum');

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
    validateJWT
}