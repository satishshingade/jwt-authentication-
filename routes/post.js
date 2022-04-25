const router =require('express').Router();
const verify=require('./verifyToken');
const jwt =require('jsonwebtoken');

router.get('/',async(req,res)=>{

    const token=req.header('auth-token');
    if(!token)return res.status(401).send("access denied");
    
    try{
        const check=jwt.verify(token,process.env.TOKEN_SECRET);
    }
    catch(error){
        console.log(error);
        res.send("wrong token");
    }
    
    res.json({
        posts:{
            title:"my first post",
            description:"random data you should'nt access"
        }
    });
});

module.exports=router;