import express from "express";

const app = express();

// function return boolean above 14 age
// use query parameter  ?age=30


// function isoldenough(age){
//     if(age>=14){
//         return true;
//     }
//     else{
//         return false;
//     }
// }


function isoldenoughmiddleware(req,res,next){
    const age=req.query.age;
    if(age>=14){
        next();
    }else{
        res.json({
            msg:"sorry you are not of age yet"
        })
    }
}

// app.get("/ride", function (req, res) {
//     if(isoldenough(req.query.age)){
//         res.json({
//             msg:"you have successfully ridden the ride 1"
//         })
//     }
//     else{
//     res.status(441).json({
//         msg: "you have not successfully ridden the ride 1"
//     })
// }
// });




// app.get("/ride2", function (req, res) {
//     if(isoldenough(req.query.age)){
//         res.json({
//             msg:"you have successfully ridden the ride 2"
//         })
//     }
//     else{
//     res.status(441).json({
//         msg: "you have not successfully ridden the ride 2"
//     })
// }
// });



app.get("/ride1",isoldenoughmiddleware, function (req, res) {
    
        res.json({
            msg:"you have successfully ridden the ride 1"
        })
});

 app.get("/ride2",isoldenoughmiddleware, function (req, res) {
    
        res.json({
            msg:"you have successfully ridden the ride 2"
        })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
