const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.cookies.token;
        const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verifiedtoken.userId;
        next();
    }catch(err){
        res.status(401).json({ success: false, message: "unauthorized"});
    }
}