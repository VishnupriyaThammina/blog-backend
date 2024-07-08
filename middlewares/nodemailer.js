const nodemailer = require('nodemailer');

const SendEmail = async(req,res)=>{
    try{
const URL = req.URL;

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
    to: req.body.email,
    subject: "Account Verification link - to Vishnu priya Thammina's website",
    html: `
    <p>Hi,</p>
    <p>Thank you for registering with us. Please click the link below to verify your account:</p>
    <p><a href="${URL}">${URL}</a></p>
    <p>Best regards,<br/>Vishnu Priya Thammina</p>
  `
  };

  let info = await transporter.sendMail(mailOptions);
return true;

    }catch(e){
        return res.status(500).json({message:"Internal server error",error:e.message})
    }
}

module.exports={SendEmail}