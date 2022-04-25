const express=require('express');
const app=express();
app.use(express.urlencoded())
app.use(express.json())

// const bp=require('body-parser');
// app.use(bp.json());
// app.use(bp.urlencoded({extended:true}));
const mongoose=require('mongoose');
const dotenv=require('dotenv');

// import routes

const authRoute=require('./routes/auth');
const postRoute=require('./routes/post');

dotenv.config()

// connect to DB 
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log('connected to db');
});




// Route middleware

app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

app.listen(3000,()=>
console.log("server running")
);