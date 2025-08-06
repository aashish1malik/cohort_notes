// https://petal-estimate-4e9.notion.site/Databases-and-MongoDb-1017dfd107358065a996cda5ed89682e
const bcrypt=require("bcrypt");

const express=require('express');
const {z} =require("zod");

const app=express();
app.use(express.json());
const jwt=require("jsonwebtoken");
const JWT_SECRET="123456789"; 
const { UserModel, TodoModel}=require('./db.js');

const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://admin:Aashish03@cluster0.mxjwpd8.mongodb.net/todos-1");


app.post('/signup',async function(req,res){

    const requiredbody=z.object({
        name:z.string().min(3).max(100),
        email:z.string().min(3).max(100),
        password:z.string().min(3).max(30)
    })

    const parsedata=requiredbody.parse(req.body);
    const parsedatasucces=requiredbody.safeParse(req.body);

    if(!parsedatasucces.success){
        res.json({
            msg:"incorrect format",
            error:parsedatasucces.error
        })
        return
    }
    
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    
     
   

    
    // { email:string,password:string,name:string}

    
    // bcrypt function
    try{
    const hashedpassword= await bcrypt.hash(password,5);
    console.log(hashedpassword);


    await UserModel.create({
        name:name,
        email:email,
        password:hashedpassword  //password:password
    });}
    catch(e){
       
        res.json({
            msg:"user  already exists"
        })
    }

    res.json({
        message:"you are signed up"
    })
    

})

app.post('/signin',async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user= await UserModel.findOne({
        email:email,
        // password:password
    })

    if(!user){
        res.status(403).json({
            msg:"user does not exits"
        });
        return
    }
    // bcrypt function
     const passwordmatch=await bcrypt.compare(password,user.password);


    if(passwordmatch){ //user
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);

        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
       console.log(user);

})

// middleware
function auth(req,res,next){
    const token = req.headers.token;
    const decodeddata=jwt.verify(token,JWT_SECRET);
    if(decodeddata){
        req.userId=decodeddata.id;
        next();

    }
    else{
        res.status(403).json({
            message:"Invalid credentials"
        })
    }
}

app.post('/todo',auth,async function(req,res){
    const userId=req.userId;
    const title = req.body.title;
    await TodoModel.create({
        title,
        userId
     })
    res.json({
        userId:userId 
    })



})

app.get('/todos',auth, async function(req,res){
     const userId=req.userId;

     const todos=await TodoModel.find({
        userId:userId
     })

     res.json({
        todos
    })


})


app.listen(3000);
