const mongoose = require('mongoose')
// imported mongoose to out file

// creating an instance of schema in mongoose
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        username:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const Users = mongoose.model('Users',UserSchema);
module.exports=Users;
