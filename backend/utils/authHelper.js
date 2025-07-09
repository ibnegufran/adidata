const bcryptjs=require('bcryptjs')

const passwordHashing=(password)=>{
const saltValue=10;
const hashedPassword=bcryptjs.hash(password,saltValue);
return hashedPassword;
}

const passwordCamparing=(password,hashedPassword)=>{
const camparePassword=bcryptjs.compare(password,hashedPassword);
return camparePassword;
}

module.exports={passwordHashing,passwordCamparing}