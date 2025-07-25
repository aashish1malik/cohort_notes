// https://petal-estimate-4e9.notion.site/Creating-an-express-app-a01ad6db6d544d2b84fd1ff5bd057abe

// Can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn’t logged in?

// https://petal-estimate-4e9.notion.site/Creating-an-express-app-a01ad6db6d544d2b84fd1ff5bd057abe

const express =require('express');
const jwt=require("jsonwebtoken");
const path = require('path');

const app=express();
app.use(express.json());

const JWT_SECRET="iamaashish";

const users=[];


// middleware
function auth(req,res,next){
    const token=req.headers.token;
    const decodeddata=jwt.verify(token,JWT_SECRET);
    if(decodeddata.username){
        req.username=decodeddata.username;
        next()
    }
    else{
        res.json({
            message:"you are logged in"
        })
    }
}

app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"You are signed up"
    })
    console.log(users);

})

app.post('/signin',function(req,res){

    const username=req.body.username;
    const password=req.body.password;
    // check if username or password already exits
    const user=users.find(function(u){
        if(u.username==username && u.password==password){
            return true;
        }
        else{
            return false;
        }

    })
    if(user){
        // const token=generateToken();
        const token=jwt.sign({
            username:username
    },JWT_SECRET);

        // user.token=token;
        res.json({
            token:token
        })
    }
        else{
            res.status(403).send({
                message:"Invalid username or password"
            })
        }
    console.log(users);
})


// # Creating an authenticated EP
// Let’s create an endpoint (`/me` ) that returns the user their information `only if they send their own token
// return information if you already sign in
app.get('/me',auth,function(req,res){
//   use of middleware
    // const username=decodedinfo.username 
    const user=users.find(function(u){
      if(u.username==req.username)
            {
            return true;
        }
        else{
            return false;
        }

    })

    if(user){
       res.json({
            username:user.username,
        })
    }
        else{
            res.status(403).send({
                message:"Invalid username or password"
            })
        }
   
})

// to avoid complexity of cors and run on localhost:3000
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

// http://localhost:3000/me
// in header   Content-Type   application.json  
// token   (from previos)


app.listen(3000);


