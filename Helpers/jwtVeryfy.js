const jwt = require('jsonwebtoken');


const verifyAdmin = (req,res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if(err){
                return res.status(403).json("Token is not valid");
            }
            if(!user.user.isAdmin) {
                return res.status(401).json("Only admin can do this action");
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json("You are not authenticated")
    }
}

module.exports = verifyAdmin