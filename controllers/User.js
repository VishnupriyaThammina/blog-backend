const User = require('../models/user')
const { gen } = require("../middlewares/jwt");

// create user controller 

const CreateUser = async(req,res)=>{
    try{
        // Creating the User 
        const existsUser = await User.findOne({username:req.body.username})
        if(existsUser){

        if(existsUser.status=='verified'){
            console.log('User already exists')
           return res.status(409).json({message:"User already exists"});
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
    }
    const token_v= await gen(req);
    req.token = token_v;
        const newUser = await new User({
            username: req.body.username,
            email : req.body.email,
            password : req.body.password,   
            token: req.token,
            status: "not-verified"
            
        })

        
        // saving priduct to DB
        const user = await newUser.save();
   
        req.email = user.email;

        console.log('User added successfully')
        // sending response back and ending execution of the function
       return newUser;

    }catch(error){
        console.log(error.message)

        return res.status(500).json({message:error.message});
    }
}


// Verify user


module.exports = {CreateUser}