const User = require('../models/user')
const { gen } = require("../middlewares/jwt");

// create user controller 

const CreateUser = async(req,res)=>{
    try{
        // Creating the User 
        const existsUser = await User.findOne({email:req.body.email})
        if(existsUser){

        if(existsUser.status=='verified'){
            console.log('User already exists')
           return 0
            // 409 represents conflict in current request body User id 
        }
        if(existsUser.status=='not-verified'){
            console.log('User already exists!!')
            const token_v= await gen(req);
            req.token = token_v;
            req.email = existsUser.email;
           return existsUser;
      // if user already exists we return and 
      // it is the register auth controllers functionality to take care of it 
      // create route only creates a new user 
      // whose status is not verifed
      // with a new verification token that is not present in the data base 
        }
    }else{

    const token_v= await gen(req);
    req.token = token_v;
        const newUser = await new User({
            username: req.body.username,
            email : req.body.email,
            password : req.body.password,   
            token: req.token,
            status: "not-verified",
            
        })

        
        // saving priduct to DB
        const user = await newUser.save();
   
        req.email = user.email;

        console.log('User added successfully')
        // sending response back and ending execution of the function
       return newUser;
    }

    }catch(error){

       return 0
    }
}


// Verify user
const verifyUser = async(req,res)=>{
    try{
        const token1 = req.body.token;
        if(!token1){
        return res.status(400).json({message:"Invalid request"})
        }
        const user = await User.findOneAndUpdate({token:token1},{status:"verified"},{new:true});
        if(!user){
        return res.status(400).json({message:"Invalid request"})

        }
        return res.status(200).json({message:"User verified"})

    }catch(error){
        return res.status(500).json({message:error.message})

    }
}

// reset password 
const resetPassword = async(req,res)=>{
    try{
const newPassword = req.body.np;
const confirmPassword =req.body.cp;
if(newPassword !== confirmPassword){
    return res.status(400).json({message:"No password match"})
}
const pass = confirmPassword
const token = req.body.token;
const user = await User.findOneAndUpdate({resetToken:token},{password:pass},{new:true});
if(!user){
    return res.status(400).json({message:"Invalid request"})

    }
return res.status(200).json({message:"Updated user successfully"})
    }catch(error){
return res.status(500).json({message:"Internal server error"})
    }
}



module.exports = {CreateUser,resetPassword,verifyUser}