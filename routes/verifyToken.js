const jwt =require('jsonwebtoken');

module.exports = function(req,res,next){
    const token=req.header('auth-token');
    if(!token)return res.status(401).send("access denied");

    try{

        console.log("verifying");
        const verified=jwt.verify(token,precess.env.TOKEN_SECRET);
        console.log(verified);
        req.user = verified;
    }
    catch(err){
        res.status(400).send(err);
    }
}