const User = require('../models/user')
const { gen } = require("../middlewares/jwt");
const {CreateUser} = require('../controllers/User')
const {SendEmail} = require('../middlewares/nodemailer')
// flow of register
// check if user exists 
// if not create user 
// if user exists and status is not verified
// making sure we have an user in the database
//we get a user in return 
// we generate a jwt token 
// store it or update it in the data base 
// find one by username and update the token present
// after generating a fresh token 
// we send a mail 
const register = async(req,res)=>{
    try{
       // create user or get the user that is already present
        const user = await CreateUser(req,res);
        // now generate a new jwt token
    
        // updated the token
        const user1 = await User.findOneAndUpdate({username:user.username},{token:req.token},{new:true});
        const email = await SendEmail(req,res);
        return res.status(200).json({message:'email sent'})


    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}


module.exports ={register}