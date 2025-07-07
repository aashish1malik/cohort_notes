
import express from "express";

const app = express();
app.use(express.json());

const users=[{
    name:"John",
    kidneys:[{
        healthy:false
    }]
}];

app.get('/', (req, res) => {
//   res.send('Hello, Express!');

const Johnkidneys=users[0].kidneys;
// console.log(Johnkidneys)

const numberofkidney=Johnkidneys.length;
let numberofhealthykidney=0;
for(let i=0;i<Johnkidneys.length;i++){
    if(Johnkidneys[i].healthy){
        numberofhealthykidney=numberofhealthykidney+1;
    }
}
const numberofunhealthykidney=numberofkidney-numberofhealthykidney;
res.json({
    numberofkidney,
    numberofhealthykidney,
    numberofunhealthykidney
})
});





app.post('/', (req, res) => {
//   res.send('Hello, Express!');

const ishealthy=req.body.ishealthy;
users[0].kidneys.push({
    healthy:ishealthy
})
res.json({
    msg:"Done!"
})
});






app.put('/', (req, res) => {
//   res.send('Hello, Express!');
for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy=true;
}
res.json({

})
});






// remove all unheathy kidneys
app.delete('/', (req, res) => {
//   res.send('Hello, Express!');
if(isThereAtleastOneUnhealthyKidney()) {
const newkidneys=[];
for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
        newkidneys.push({
            healthy:true
        })
    }
}

users[0].kidneys=newkidneys;
res.json({msg:"done"})

}

else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});



function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



// in postman :  post :http://localhost:3000
//  get :http://localhost:3000/
// req :request
// res:response