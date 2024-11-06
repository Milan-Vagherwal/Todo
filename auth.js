const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomKirat123&&";

function auth(req, res, next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,JWT_SECRET);

    if(response){
        req.userId = response.id;
        next();
    }else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}
module.exports = {
    auth,
    JWT_SECRET
}