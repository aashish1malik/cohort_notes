// https://petal-estimate-4e9.notion.site/Creating-an-express-app-a01ad6db6d544d2b84fd1ff5bd057abe

const express =require('express');
const jwt=require("jsonwebtoken");

const app=express();
app.use(express.json());

const JWT_SECRET="iamaashish";

const users=[];
// return random long string
// function generateToken(){
//      let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//          'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's',
//           't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 
//           'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
//             'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6',
//              '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         //  Math.random gives you between zero and 1
//         // optioms.length( )    between 0 and 42
//         // floor 11.1 =>11  , 222.331=>22
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;

//     //  return Math.random()  return a long random integer 
// }



app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    // if(username.length<5){

    // }

    // if(users.find(u=>u.username==username)){
    //     res.json({
    //         message:"you are already sign up"
    //     })
    //     return 
    // }
    

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
app.get('/me',function(req,res){
    // add in header during get request name is token
    const token=req.headers.token
    const decodedinfo=jwt.verify(token,JWT_SECRET);    // {username:JOHN}
    const username=decodedinfo.username 
    // const user = users.find(user => user.token === token);
    const user=users.find(function(u){
        // if(u.token==token)
        if(u.username==username)
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
            password:user.password
        })
    }
        else{
            res.status(403).send({
                message:"Invalid username or password"
            })
        }
   
})

// http://localhost:3000/me
// in header   Content-Type   application.json  
// token   (from previos)


app.listen(3000);


