import express from "express";

const app=express();

// app.get('/sum',function(req,res){
//     const a=parseInt(req.query.a);
//     const b=parseInt(req.query.b);

//     res.json({
//         answer:a+b
//     })

// })


app.get('/sum/:firstarg/:secondarg',function(req,res){
    // http://localhost:3000/sum/8/9
    const a=parseInt(req.params.firstarg);
    const b=parseInt(req.params.secondarg);

    res.json({
        answer:a+b
    })

})



// http://localhost:3000/sum?a=3&b=5

app.get('/multiply',function(req,res){
    const a=req.query.a;
    const b=req.query.b;

    res.json({
        answer:a*b
    })
    
})

app.listen(3000);