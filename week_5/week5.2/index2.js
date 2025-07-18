// create a backend server in nodejs that return the sum endpoints
// write an HTML file,that hits the background server using fetch api


import express from 'express';
import cors from 'cors';
// use cors to avoid cors error

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",function(req,res){
    res.sendFile(__dirname+"week5.2\public\index2.html");
})

app.post('/sum',function(req,res){
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);

    res.json({
        answer:a+b
        })
})

app.listen(3000);
