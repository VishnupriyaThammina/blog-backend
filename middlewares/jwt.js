const jwt= require('jsonwebtoken')
const User = require('../models/user')

const JWT_SECRET = process.env.JWT_SECRET

const gen=(req)=>{

token = jwt.sign({
    // field which needs to be used in token
    email:req.body.email,
    
}, 
JWT_SECRET,
{expiresIn:'24h'}
)

return token;
}



const verifyToken = (req,res,next)=>{
    // get the token from bearer auth header

    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(409).json({message:"auth header is not present "})
    }

    const token = authHeader.split(' ')[1];
    // the 2nd argument after spliting the received content based on the delimeter space 
    // autheader.split(' ')[1]
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(500).json({message:"failed to authenticate token"})
        }
        req.email = decoded.email;
        
        next();
        // implement the next middleware
    })
}

module.exports = { gen, verifyToken}