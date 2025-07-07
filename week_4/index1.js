
import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.post('/', (req, res) => {
  res.send('Hello, Express!');
});



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



// in postman :  post :http://localhost:3000
//  get :http://localhost:3000/
// req :request
// res:response