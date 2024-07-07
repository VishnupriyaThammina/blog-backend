const nodemailer = require('nodemailer');

const SendEmail = async(req,res)=>{
    try{
        const original_url = 'http://localhost:3000/verification';
        const token = req.token;
        const URL = `${original_url}/${token}`
          // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // enforcing secure transfer
    auth: {
      user: 'vishhxh@gmail.com',
      pass: 'wcde zpip scvy dmbo'
    }
  });
  // Set up email data
  let mailOptions = {
    from: 'vishhxh@gmail.com',
    to: 'vishhxh@gmail.com',
    subject: "Account Verification link - to Vishnu priya Thammina's website",
    text: `Hi, this is your verification link: ${URL}`
  };

  let info = await transporter.sendMail(mailOptions);
return true;

    }catch(e){
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

module.exports={SendEmail}