const jwt = require('jsonwebtoken');

const privateKey = 'JS0NW3BT0K3N';

exports.generateToken = (info) => {
    return jwt.sign(info, privateKey);
};

exports.validateToken = (token) => {
    try {
        return jwt.verify(token, privateKey, {
            expiresIn: "1h"
        });
    } catch(error) {
        return false;
    }
};