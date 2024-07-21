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
if(user===0){
    return res.status(400).json({message:'Invalidt'})

}else{

        // updated the token
        const user1 = await User.findOneAndUpdate({username:user.username},{token:req.token},{new:true});
        const original_url = 'https://blog-frontend-kappa-sand.vercel.app/verification';
        const token = req.token;
        req.URL = `${original_url}/${token}`
        const email = await SendEmail(req,res);
        return res.status(200).json({message:'email sent'})
    }


    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}


const resetMail = async(req,res)=>{
    try{
       // create user or get the user that is already present
        // now generate a new jwt token
        const token_v= await gen(req);
        req.token = token_v;
        // updated the token
        const user1 = await User.findOneAndUpdate({email:req.body.email},{resetToken:req.token},{new:true});
       
        const original_url = 'https://blog-frontend-kappa-sand.vercel.app/reset-password';
        const token = req.token;
        req.URL = `${original_url}/${token}`
        const email = await SendEmail(req,res);
        return res.status(200).json({message:'email sent'})


    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

const login = async(req,res)=>{
    try{
        const id = req.body.email;
        const password = req.body.password;
       
        const user = await User.findOne({email:id});
        if(!user){
           return res.status(400).json({message:"User does not exists"})
        }
        if(user.status !== 'verified'){
         return   res.status(400).json({message:"User registration incomplete "})
        }
        if(user.password!==password){
          return  res.status(401).json({message:"Unauthorized "})
        }
       const token = await gen(req);
       return res.status(200).json({token:token,message:"login successfull"})
 
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
        
    }
}

module.exports ={register, resetMail, login}