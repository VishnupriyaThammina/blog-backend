const mongoose = require('mongoose')
// imported mongoose to out file

// creating an instance of schema in mongoose
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdTime:{
        type: Date,
        default: Date.now,
    },
    updatedTime:{
        type: Date,
        default: Date.now,
    },
    // reference to users table
    userid:{
        type: Schema.Types.ObjectId,
        ref:'Users',
        required: true,
    }
})

const Posts = mongoose.model('Posts',postSchema);
module.exports=Posts;