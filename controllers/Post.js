
const Post = require('../models/post')

const check = async(req,res)=>{
    try{
return res.status(200).json({message:"jwt verify function is a hit",email:req.email})
    }catch(e){
return res.status(500).json({message:"verfiy didnt work"})
    }
}
module.exports ={check}