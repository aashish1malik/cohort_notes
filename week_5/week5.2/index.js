// https://petal-estimate-4e9.notion.site/HTTP-Deep-dive-d59b6336fa5a46daa56c21063578d400?pvs=74
import express from "express";

const app=express();

// logs the method,timestamp and url
// middleware

function loggermiddleware(req,res,next){
    console.log("Method is"+ req.method);    
    
     console.log("URL is"+ req.url);
      console.log(new Date());
      next();

}
app.use(loggermiddleware);
// output
// Method isGET
// URL is/sum?a=3&b=5
// 2025-07-17T17:00:46.266Z
// Method isGET
// URL is/favicon.ico
// 2025-07-17T17:00:46.350Z

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);