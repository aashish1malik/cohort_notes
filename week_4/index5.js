import express from "express";

const app = express();


// Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which clears every one second
// */



// middleware



// create a setInterval function that clears the numberOfRequestsForUser object every one second
let numberofrequestsforuser={};
setInterval(()=>{
    numberofrequestsforuser={};
},6000)


app.use(function(req,res,next){
    const userId=req.headers['user-id'];
      if (!numberofrequestsforuser[userId]) {
        numberofrequestsforuser[userId] = 1;
    } else {
        numberofrequestsforuser[userId]++;
    }

    // Check if limit exceeded
    if (numberofrequestsforuser[userId] > 5) {
        return res.status(404).send("Too many requests. Limit exceeded.");
    }

    next();

   
})


app.get("/user", function (req, res) {
   
    res.status(200).json({ name: "AASHISH" });
});


app.post("/user", function (req, res) {
    
    res.status(200).json({ msg: "created dummy user" });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
