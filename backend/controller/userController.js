const User = require("../model/User");
const { passwordHashing, passwordCamparing } = require("../utils/authHelper");
const jwt = require('jsonwebtoken');

const signupController=async(req,res)=>{
try {
  const {name,email,password}=req.body;

  if (!name || !email || !password ){
    res.status(400).send({
      success:false,
        message:"All fields are required"
    })
  }

const userExist=await User.findOne({email});
if(userExist){
    res.status(400).send({
      success:false,
      message:"user already exist",
    })
}
const hashedPassword=await passwordHashing(password); 

const user=await new User({name,email,password:hashedPassword}).save();

res.status(201).send({
  success:true,

user,
message:"user registered successfully",
})





} catch (error) {
  res.status(400).send({
    success:false,
    message:"error in registration",
     error:error.message
  })
    console.log(error)
}
}

const signinController=async(req,res)=>{
try {
  const {email,password}=req.body;
  console.log(email,password)
  if(!email || !password) {
    res.status(400).send({
      success:false,
        message:"All fields are required"
    })
  }

  const hashedPassword=await passwordHashing(password);
  const isSame=await passwordCamparing(password,hashedPassword);
  const isEmail=await User.findOne({email});
  if(!isSame && !isEmail){

    return  res.status(400).send({
      success:false,
      message:"Invalid Credentials"
    })
  }

  const token=jwt.sign(
    {userId:isEmail._id,email:isEmail.email},
    process.env.JWT_SECRET,
    {expiresIn:'30d'}
  );

  res.status(201).json({token,isEmail});
  

} catch (error) {
  res.status(400).send({
    success:false,
    message:"Error in signin"
  })
}
}


module.exports={signupController,signinController}