const router=require('express').Router();
const User=require('../model/User');
const {registerValidation,loginValidation}=require('./validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


router.post('/register',async(req,res)=>{
    
    console.log(req.body);
    // let's validate the data before we a user 
    const {error}=registerValidation(req.body);
    if(error){
         return res.status(400).send(error);
    }

    //checking if the user is already in the database 

    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist){
        return res.status(400).send("email already exist");
    }

    // hash the passwords
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);


    // creater user
    const user=new User ({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword

    });

    try{
        const savedUser =await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});



//login
router.post('/login',async(req,res)=>{



    const {error}=loginValidation(req.body);
    if(error)
    return res.status(400).send(error);

    const user=await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).send("email is wrong");
    
    const validpass=await bcrypt.compare(req.body.password,user.password);
    if(!validpass)
        return res.status(400).send("invalid password");
    
    
    // create and assign token
    const token = jwt.sign({name:user.name},process.env.TOKEN_SECRET);
    res.header('auth-token',token);
    
    res.send(token);

});




module.exports=router;