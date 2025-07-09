import express from "express";

const app = express();

let requestcount=0;

// middleware
app.use(function(req,res,next){
    requestcount+=1;
    next();
})


app.get('/user',function(req,res){
    res.status(200).json({name:'john'});
})

app.post('/user',function(req,res){
    res.status(200).json({msg:'created dummy user'});
})

app.get('/requestCount',function(req,res){
    res.status(200).json({requestcount});
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

