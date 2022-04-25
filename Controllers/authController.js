const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let userInformations = await User.findOne({ email });
    if (!userInformations) return res.status(404).json({ message: "Account doesn't exist or deleted" });
    if (!bcrypt.compareSync(password, userInformations.password))return res.status(400).json({message: "Incorrect Password !"});
    if (userInformations.confirmed == false) return res.status(400).json({ message: "Please Confirm your email" });
    if (userInformations.accountStatus == false) return res.status(400).json({ message: "Your account is blocked !" });
      const payload = {
        user: {
          id: userInformations.id,
          firstname: userInformations.firstname,
          role: userInformations.role
        }
      };
      const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
      return res.status(200).json({message:"login OK",Token: Token});
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Server Error."});
  }
}
exports.signup =async (req, res) => {
  if (req.body.email != "" && req.body.password.length > 6) {
    try {
      const email=req.body.email
      const password = req.body.password
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(password, salt);
      let userInformations =await User.findOne({ email });
      
      if (userInformations) return res.status(400).json({ message: "Account alredy exist " });
      const user = new User(req.body).save().then(data => {
        const payload = {
          user: {
            userId: data.id,
            sub: "email confirmation"
          }
        };

        const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAILER_EMAIL_ID,
            pass: process.env.MAILER_PASSWORD
          },
        });
        let url = `http://localhost:3000/auth/confirmEmail/${Token}`
        var mailOptions = {
          from: 'lassedmaghrebi1@gmail.com',
          to: req.body.email,
          subject: 'Account Activation',
          html: "<h1>Hello " + req.body.firstname + "</h1> <p>Click the link below to activate your account in MiniFoot.tn</p>"
            + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
        border-radius:8px;font-size:1.5rem;">
        Activate Your Account</a>`
            + "<p style='color:#E74C3C;'>this link will expire in 24h</p>"

        };
        transporter.sendMail(mailOptions).then(resp => {
          return res.status(200).json({
            message: 'Verification Email sent Verify you mailbox'
          });
        },
          err => {
            return res.status(400).json({
              message: 'Enter a valid email'
            });
          })

      })
    } catch (error) {
      res.status(500).json({
        message: error.message || "Server Error."
      });
    }
  }
}
exports.signout = (req, res) => {
  const token = req.header("token");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = decoded.user;
    User.findByIdAndUpdate(decoded.user.id, { DeconnectionTime: Date.now() }, (err, result)=> {
      if (err) return res.status(404).json({ message: "user not exists" })
      res.status(200).json({ message: "Deconnected!" })
    })
  } catch (e) {
    res.status(500).json({ message: "Server Error." });
  }
}
exports.confirmEmail = async (req, res) => {
  try {
    const token = req.params.token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded.user.sub != "email confirmation") return res.status(401).json({ message: "Please Use a valid token" });
    let userInformations = await User.findById(decoded.user.userId);
    if (!userInformations) return res.status(404).json({ message: "Account doesn't exist or deleted" });
    if (userInformations.confirmed) return res.status(400).json({ message: "Your email has been verified" });
    User.findByIdAndUpdate(userInformations.id, { $set: { confirmed: true } },(err, result)=> {
      if (result) {
        return res.send(`<p style="text-align: center">Your email is verified with success <meta http-equiv = "refresh" content = "1; url = http://localhost:4200/Signin" /><a href="http://localhost:4200/Signin">return back</a></p>`);
      }
      else {
        return res.send(`Email Verification error : Try again Later Or contact us from here <a href="mailto:lassedmaghrebi1@gmail.com">Service tecknique</a>`);
      }

    })
  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error." });

  }
}
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (req.body.email == null) return res.status(404).json({ message: "Email adress required !" });
    let user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "Account doesn't exist or deleted" });
    if (user.passwordChangeDate * 1 + 3600000 > Date.now()) return res.status(400).json({ message: "You alredy changed your password " });
    const payload = {
      user: {
        userId: user.id,
        sub: "Reset Password"
      }
    };

    const Token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '5m' })

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_EMAIL_ID, // generated ethereal user
        pass: process.env.MAILER_PASSWORD // generated ethereal password
      },
    });
    let url = `http://localhost:4200/reset-password/${Token}`
    var mailOptions = {
      from: 'lassedmaghrebi1@gmail.com',
      to: req.body.email,
      subject: 'Reset Password',
      html: "<h1>Hello " + user.firstname + "</h1> <p>Click the link below to reset your password in MiniFoot.tn</p>"
        + `<a href="${url}" style="background-color: #3498DB;color: white;padding: 14px;text-align: center;text-decoration: none;
      border-radius:8px;font-size:1.5rem;">
      Reset Password</a>`+ "<p style='color:#E74C3C;'>this link will expire in 5m</p>"

    };

    transporter.sendMail(mailOptions)
    return res.status(200).json({
      message: 'Verification Email sent Verify your mailbox'
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error." });
  }
}
exports.resetPassword = async (req, res) => {
  const token = req.header("token");
  if (!token) { return res.status(401).json({ message: "Please use the link in your email to reset your password" }); }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  if (!decoded) return res.status(401).json({ message: "Please Use a valid token" });
  if (decoded.user.sub != "Reset Password") return res.status(401).json({ message: "Please Use a valid token" });
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  let userInformations = await User.findById(decoded.user.userId)
  if (bcrypt.compareSync(req.body.password, userInformations.password)) return res.status(400).json({ message: "Please don't use the same password" });
  if (userInformations.passwordChangeDate * 1 + 3600000 > Date.now()) return res.status(400).json({ message: "You alredy changed your password last 24 hours" });
  User.findByIdAndUpdate(decoded.user.userId, { $set: { password: password, passwordChangeDate: Date.now(),DeconnectionTime: Date.now() } }, function (err, result) {
    if (result)return res.status(200).json({ message: "Your password has been changed successfully" })
    return res.status(400).json({ message: 'Email Verification error' });
  })
}
exports.changePassword = async (req, res) => {
  try {
    const userInformations=await User.findById(req.body.user)
    if (!bcrypt.compareSync(req.body.password, userInformations.password))return res.status(400).json({message: "Incorrect Password !"});
    if (bcrypt.compareSync(req.body.newPassword, userInformations.password)) return res.status(400).json({ message: "Please don't use the same password" });
    if (userInformations.passwordChangeDate * 1 + 3600000 > Date.now()) return res.status(400).json({ message: "You alredy changed your password last 24 hours" });
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(req.body.newPassword, salt);
    User.findByIdAndUpdate(req.body.user,{password:newPassword,passwordChangeDate: Date.now(),DeconnectionTime: Date.now()},(err,result)=>{
      if (err) res.status(400).json({ message: 'Error Password could be changed' });
      if (result)return res.status(200).json({ message: "Your password has been changed successfully" })
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Server Error." });
    
  }
}
exports.disableUsersAccount = (req, res) => {
  try {
    const user=User.findByIdAndUpdate(req.body.id, { $set: { accountStatus: false, DeconnectionTime: Date.now() } },(err, result)=> {
      if (result) return res.status(200).json({ message: "Account"+user.firstname+"Blocked" });
      if(err) return res.status(400).json({ message: "Erreur" });

    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error." });
  }
}
exports.activateUsersAccount = (req, res) => {
  try {
    User.findByIdAndUpdate(req.body.id, { $set: { accountStatus: true } },(err, result)=> {
      if (result) return res.status(200).json({ message: "Account "+user.firstname+" was activated" });
      if(err) return res.status(400).json({ message: "Erreur" });
    })
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server Error." });
  }
}
exports.getAllUsers = (req, res) => {
  try {
    User.find((err, result)=> {
      if (result)return res.status(200).json(result)
      if(err) return res.status(400).json({ message: "Erreur" });
    })
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message|| "Server Error." });
  }
}
exports.findByEmail =async (req, res) => {
  try {
    User.findOne({ email: req.body.email },(err, result)=>{
      if (result)return res.status(200).json({message:true})
      if (!result)return res.status(200).json({message:false})
      if(err) return res.status(400).json({ message: "Erreur" });
    })
  } catch (e) {
    res.status(500).json({  message: e.message|| "Server Error."});
  }
}
// exports.addAdmin = (req, res) => {

//   try {
//     let userInformations = User.findById(decoded.user.id);
//     if(userInformations.DeconnectionTime>decoded.iat*1000) return res.status(401).send({ message: "Invalid Or Expired Token" });
//     if(userInformations.role=="ADMIN"){

//     }else return res.status(401).json({ message: "Only Admin can acess to this page" });
//   } catch (e) {
//     res.status(500).send({ message: e });
//   }
// }

// const accountSid = 'ACcd42c602c83287ff0a65d3e1a50fb2ef';
// const authToken = 'bc2a85c1a1e8dacd08c354eae026ed4f';
// const client = require('twilio')(accountSid, authToken);
// exports.addPhoneNumber = async (req, res) => {
//   const token = req.header("token");
//   console.log(req.body);
//   try {
//     let x=Math.floor(Math.random() * 1000000)
//     // client.messages.create({
//     //   body: ' Hr-Sport '+x,
//     //   from: '+14707228531',
//     //   to: req.body.phone
//     // }).then(message => console.log(message.sid)
//     // ).catch(err =>  res.status(400).send({ message: "Please use a valid phone number"})); 
//     let user =await User.findByIdAndUpdate(req.body.user,{ $set: { phone:{
      
//       number: req.body.phone,
//       verified:false,
//       verificationCode: x,
//       verificationCodeExpireDate:Date.now()+60000
//     } 
//     }})
//     res.status(200).json({ message: "Verification code send "})
    
//   }catch(e){
//     res.status(200).json({ message: "Verification code send "})
//   }
// }
// exports.verifPhoneNumber = async (req, res) => {
//   try {
//     let userInformations =await User.findById(req.body.user)
//     if(userInformations.phone.verificationCodeExpireDate<Date.now())return res.status(400).json({ message: "Verification code expire try again"})
//     if(req.body.code==userInformations.phone.verificationCode.toString()){
//     await User.findByIdAndUpdate(req.body.user,{ $set: { phone:{
//       verified:true,
//       number:userInformations.phone.number
//     } 
//     }})
//     res.status(200).json({ message: "Phone number verified"})
//    } else res.status(400).json({ message: "Verification code wrong"})

//   }catch(e){
//     res.status(200).json({ message: "Server Error."})
//   }
// }
const multer = require('multer'); 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, './uploads')
  },
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + '-' + Date.now() +file.originalname);
  }
})
let upload = multer({ storage: storage}).array('image',10);
exports.upload =(req, res) => {
  upload(req,res,(err)=>{
    console.log(req.body);
    console.log(req.file)
    // User.findOneAndUpdate({ email: req.body.email }, { $push:{ images:{url:req.file.filename,uploaded: Date.now()} }},(err,result)=>{
    //   if (result) res.status(200).json({message:"image is uploaded successfully!"})
    // })
    if(err) {  
        return res.end("Error uploading file.");  
    }  
    res.end("File is uploaded successfully!");  
});  
}