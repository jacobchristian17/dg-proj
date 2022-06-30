const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus('401');
    } else {
        console.log(authHeader);
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN,
            (err, decoded) => {
                if(err) return res.sendStatus(403); //invalid token
                req.user = decoded.UserInfo.user;
                req.roles = decoded.UserInfo.roles;
                next();
            }
        )
    }
};

module.exports = verifyJWT;