const {validateToken} = require('../util/jwt');

exports.validateAccessToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({
            success: false,
            error: "A token must be provided"
        });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const validToken = validateToken(token);

    if (validToken) {
        req.token_info = validToken; 
        next();
    } else {
        res.status(401).json({
            success: false,
            error: "Unauthorized - Invalid Token"
        });
    }
};

exports.validateAdmin = (req, res, next) => {
    if (req.token_info.is_admin) {
        next();
    } else {
        res.status(401).json({
            success: false,
            error: "Unauthorized - Only administrators users can manage this resource"
        });
    }
};