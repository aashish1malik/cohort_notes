const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const Objectid=Schema.ObjectId;

const User=new Schema({
    name:String,
    email:String,
    password:String
});


const Todo=new Schema({
    title:String,
    done:Boolean,
    userId:Objectid
})

// Create a model for the "users" collection using the User schema
const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);


// Export both models so they can be used in other files
module.exports={
    UserModel,
    TodoModel
}





